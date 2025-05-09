const joinCommentsToPost = require('../joins/joinCommentsToPost');
const joinLikesToPost = require('../joins/joinLikesToPost');
const joinUserToPost = require('../joins/joinUserToPost');
const PostModel = require('../models/PostModel');
const UserModel = require('../models/UserModel');
const LikeModel = require('../models/LikeModel');
const CommentModel = require('../models/CommentModel');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const cloudinary = require('cloudinary').v2;

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
    const posts = await PostModel.aggregate([
        { $match: { userId: req.user._id } },
        { $sort: { createdAt: -1 } },
        ...joinUserToPost,
        ...joinLikesToPost,
        ...joinCommentsToPost,
    ]);
    if (!posts) return next(new CustomError('You have not created any post yet.', 404));

    res.status(200).json({
        status: 'success',
        posts,
    });
});

const getDashboardUserReactions = asyncErrorHandler(async (req, res, next) => {
    const [likedPosts, comments] = await Promise.all([LikeModel.aggregate([{ $match: { userId: req.user._id } }])]);
    res.send('ok');
});

module.exports = {
    getDashboardHomePosts,
    getDasboardUserProfile,
    updateProfileImage,
    updateProfileInfo,
    getDasboardUserPosts,
    getDashboardUserReactions,
};
