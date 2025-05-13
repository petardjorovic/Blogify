const joinCommentsToPost = require('../joins/joinCommentsToPost');
const joinLikesToPost = require('../joins/joinLikesToPost');
const joinUserToPost = require('../joins/joinUserToPost');
const joinPostToLike = require('../joins/joinPostToLike');
const joinPostToComment = require('../joins/joinPostToComment');
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const LikeModel = require('../models/LikeModel');
const CommentModel = require('../models/CommentModel');
const TagModel = require('../models/TagModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const cloudinary = require('cloudinary').v2;
const mongoose = require('mongoose');

const getDasboardUserProfile = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    });
});

const getDashboardHomePosts = asyncErrorHandler(async (req, res, next) => {
    const matchConditions =
        req.user.role === 'admin'
            ? { $match: {} }
            : {
                  $match: {
                      $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }],
                  },
              };
    const [newPosts, mostLikedPosts, mostCommentedPosts] = await Promise.all([
        PostModel.aggregate([matchConditions, { $sort: { createdAt: -1 } }, { $limit: 7 }, ...joinUserToPost, ...joinLikesToPost]),
        PostModel.aggregate([
            matchConditions,
            ...joinLikesToPost,
            {
                $addFields: {
                    likesCount: { $size: '$likes' },
                },
            },
            { $sort: { likesCount: -1, createdAt: -1 } },
            { $limit: 7 },
            ...joinUserToPost,
        ]),
        PostModel.aggregate([
            matchConditions,
            ...joinCommentsToPost,
            { $addFields: { commentsCount: { $size: '$comments' } } },
            { $sort: { commentsCount: -1, createdAt: -1 } },
            { $limit: 7 },
            ...joinUserToPost,
            ...joinLikesToPost,
        ]),
    ]);
    res.status(200).json({
        status: 'success',
        newPosts,
        mostLikedPosts,
        mostCommentedPosts,
    });
});

const updateProfileImage = asyncErrorHandler(async (req, res, next) => {
    if (req.user.image !== 'https://res.cloudinary.com/dhfzyyycz/image/upload/v1745679699/avatar_cychqb.png') {
        const parts = req.user.image.split('/');
        const imageName = parts.pop().split('.')[0];
        const folderName = parts[parts.length - 1];
        await cloudinary.uploader.destroy(`${folderName}/${imageName}`);
    }
    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, { image: req.file.path });
    if (!updatedUser) return next(new CustomError('An error occurred, please try later', 500));
    res.status(200).json({
        status: 'success',
        message: 'Image updated!',
        image: req.file.path,
    });
});

const updateProfileInfo = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.gender) req.body.gender = null;
    if (!req.body.birthDate) req.body.birthDate = null;
    const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true });
    if (!updatedUser) return next(new CustomError('Something went wrong, please try later', 500));
    res.status(200).json({
        status: 'success',
        message: 'Profile info successfully updated',
        user: updatedUser,
    });
});

const getDasboardUserPosts = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const [posts, postsCount] = await Promise.all([
        PostModel.aggregate([
            { $match: { userId: req.user._id } },
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
            ...joinUserToPost,
            ...joinLikesToPost,
            ...joinCommentsToPost,
        ]),
        PostModel.countDocuments({ userId: req.user._id }),
    ]);

    if (!posts) return next(new CustomError('You have not created any post yet.', 404));

    res.status(200).json({
        status: 'success',
        posts,
        postsCount,
    });
});

const getDashboardUserReactionsLikes = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const [likes, totalLikes] = await Promise.all([
        LikeModel.aggregate([
            {
                $match: { userId: req.user._id },
            },
            ...joinPostToLike,
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]),
        LikeModel.aggregate([
            {
                $match: { userId: req.user._id },
            },
            { $count: 'total' },
        ]),
    ]);

    const total = totalLikes[0]?.total || 0;

    res.status(200).json({
        status: 'success',
        likes,
        total,
    });
});

const getDashboardUserReactionsComments = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const [comments, totalComments] = await Promise.all([
        CommentModel.aggregate([
            {
                $match: { 'user.id': req.user._id },
            },
            ...joinPostToComment,
            { $sort: { createdAt: -1 } },
            { $skip: (page - 1) * limit },
            { $limit: limit },
        ]),
        CommentModel.aggregate([
            {
                $match: { 'user.id': req.user._id },
            },
            ...joinPostToComment,
            { $count: 'total' },
        ]),
    ]);

    const total = totalComments[0]?.total || 0;

    res.status(200).json({
        status: 'success',
        comments,
        total,
    });
});

const getDashboardSinglePostEdit = asyncErrorHandler(async (req, res, next) => {
    const { postId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(postId)) {
        return next(new CustomError('Invalid postId format', 400));
    }
    const [post, tags] = await Promise.all([
        PostModel.aggregate([
            {
                $match: { $expr: { $eq: ['$_id', { $toObjectId: postId }] } }, // { _id: new mongoose.Types.ObjectId(req.params.postId) }
            },
            ...joinUserToPost,
            ...joinCommentsToPost,
            ...joinLikesToPost,
        ]),
        TagModel.find().sort({ name: 1 }),
    ]);

    res.status(200).json({
        status: 'success',
        post: post[0],
        tags,
    });
});

const updatePostImage = asyncErrorHandler(async (req, res, next) => {
    const { postId, image } = req.query;
    const parts = image.split('/');
    const imageName = parts.pop().split('.')[0];
    const folderName = parts[parts.length - 1];
    await cloudinary.uploader.destroy(`${folderName}/${imageName}`);

    const updatedPost = await PostModel.findByIdAndUpdate(postId, { image: req.file.path });
    if (!updatedPost) return next(new CustomError('An error occurred, please try later', 500));

    res.status(200).json({
        status: 'success',
        message: 'Image updated!',
        image: req.file.path,
    });
});

const updatePostInfo = asyncErrorHandler(async (req, res, next) => {
    const { postId, ...postData } = req.body;
    const newTags = postData.tags.map((tag) => {
        return { name: tag };
    });
    postData.tags = newTags;
    console.log(postData, 'postData');
    const updatedPost = await PostModel.findByIdAndUpdate(postId, postData, { new: true });
    if (!updatedPost) return next(new CustomError('Something went wrong, please try later', 500));
    res.status(200).json({
        status: 'success',
        message: 'Post updated',
        post: updatedPost,
    });
});

module.exports = {
    getDashboardHomePosts,
    getDasboardUserProfile,
    updateProfileImage,
    updateProfileInfo,
    getDasboardUserPosts,
    getDashboardUserReactionsLikes,
    getDashboardUserReactionsComments,
    getDashboardSinglePostEdit,
    updatePostImage,
    updatePostInfo,
};
