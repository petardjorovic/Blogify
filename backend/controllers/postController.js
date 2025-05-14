const mongoose = require('mongoose');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const PostModel = require('../models/PostModel');
const joinUserToPost = require('../joins/joinUserToPost');
const joinCommentsToPost = require('../joins/joinCommentsToPost');
const joinLikesToPost = require('../joins/joinLikesToPost');
const path = require('path');
const ObjectId = mongoose.Types.ObjectId;
const cloudinary = require('cloudinary').v2;
const CommentModel = require('../models/CommentModel');
const LikeModel = require('../models/LikeModel');
const fs = require('fs');

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
    const matchConditions =
        req.user.role === 'admin'
            ? { $match: {} }
            : {
                  $match: {
                      $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }],
                  },
              };
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const posts = await PostModel.aggregate([
        matchConditions,
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        ...joinUserToPost,
        ...joinLikesToPost,
    ]);
    const postsCount = await PostModel.countDocuments(matchConditions.$match);

    if (!posts) return next(new CustomError('There are no posts', 404));

    res.status(200).json({
        status: 'success',
        posts,
        postsCount,
    });
});

const getSinglePost = asyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.postId)) {
        return next(new CustomError('Invalid postId format', 400));
    }
    const [post] = await PostModel.aggregate([
        {
            $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.postId }] } }, // { _id: new mongoose.Types.ObjectId(req.params.postId) }
        },
        ...joinUserToPost,
        ...joinCommentsToPost,
        ...joinLikesToPost,
    ]);

    if (!post) return next(new CustomError(`Post with id ${req.params.postId} not found.`));

    res.status(200).json({
        status: 'success',
        post,
    });
});

const getPostsByTag = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const { tagName } = req.params;
    const matchConditions =
        req.user.role === 'admin'
            ? { $match: { 'tags.name': tagName } }
            : {
                  $match: {
                      $or: [
                          { 'tags.name': tagName, isPublic: true },
                          { 'tags.name': tagName, isPublic: false, userId: req.user._id },
                      ],
                  },
              };
    const posts = await PostModel.aggregate([
        matchConditions,
        {
            $sort: { createdAt: -1 },
        },
        { $skip: (page - 1) * limit },
        {
            $limit: limit,
        },
        ...joinUserToPost,
        ...joinLikesToPost,
    ]);
    const postsCount = await PostModel.countDocuments(matchConditions.$match);
    if (!posts) return next(new CustomError(`There are no posts by tag name ${tagName}`, 404));

    res.status(200).json({
        status: 'success',
        posts,
        postsCount,
    });
});

const getPostsByUser = asyncErrorHandler(async (req, res, next) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.userId)) {
        return next(new CustomError('Invalid userId format', 400));
    }
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const matchConditions =
        req.user.role === 'admin' || req.user._id.toString() === req.params.userId
            ? { $match: { userId: new ObjectId(req.params.userId) } }
            : { $match: { userId: new ObjectId(req.params.userId), isPublic: true } };

    const posts = await PostModel.aggregate([
        matchConditions,
        {
            $sort: { createdAt: -1 },
        },
        { $skip: (page - 1) * limit },
        {
            $limit: limit,
        },
        ...joinUserToPost,
        ...joinLikesToPost,
    ]);
    const postsCount = await PostModel.countDocuments(matchConditions.$match);
    if (!posts) return next(new CustomError(`There are no posts by user with id ${req.params.userId}`, 404));

    res.status(200).json({
        status: 'success',
        posts,
        postsCount,
    });
});

const getPostsBySearch = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.params.page);
    const limit = parseInt(req.params.limit);
    let searchTerm = [];
    if (req.user.role === 'admin') {
        if (typeof req.query.keyword === 'string') {
            searchTerm.push(
                { title: { $regex: req.query.keyword, $options: 'i' } },
                { body: { $regex: req.query.keyword, $options: 'i' } }
            );
        } else {
            for (let i = 0; i < req.query.keyword?.length; i++) {
                searchTerm.push(
                    { title: { $regex: req.query.keyword[i], $options: 'i' } },
                    { body: { $regex: req.query.keyword[i], $options: 'i' } }
                );
            }
        }
    } else {
        if (typeof req.query.keyword === 'string') {
            searchTerm.push(
                {
                    title: { $regex: req.query.keyword, $options: 'i' },
                    $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }],
                },
                { body: { $regex: req.query.keyword, $options: 'i' }, $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }] }
            );
        } else {
            for (let i = 0; i < req.query.keyword.length; i++) {
                searchTerm.push(
                    {
                        title: { $regex: req.query.keyword[i], $options: 'i' },
                        $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }],
                    },
                    {
                        body: { $regex: req.query.keyword[i], $options: 'i' },
                        $or: [{ isPublic: true }, { isPublic: false, userId: req.user._id }],
                    }
                );
            }
        }
    }

    const posts = await PostModel.aggregate([
        {
            $match: {
                $or: searchTerm,
            },
        },
        { $skip: (page - 1) * limit },
        {
            $limit: limit,
        },
        ...joinUserToPost,
        ...joinLikesToPost,
    ]);
    const postsCount = await PostModel.countDocuments({
        $or: searchTerm,
    });

    res.status(200).json({
        status: 'success',
        posts,
        postsCount,
    });
});

const addNewPost = asyncErrorHandler(async (req, res, next) => {
    const userData = JSON.parse(req.body.data);
    const newTags = userData.tags.map((tag) => {
        return { name: tag };
    });
    userData.tags = newTags;

    //* OVO SAM KORISTIO KAD SAM POMOCU FILEUPLOAD CUVAO SLIKU NA SERVERU
    // const image = req.files.image;
    // const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
    // if (!allowedTypes.includes(image.mimetype)) {
    //     return next(new CustomError('Invalid image type. Allowed types are: JPG, PNG, WEBP, GIF, SVG.', 400));
    // }
    // if (image.size > 524288) {
    //     return next(new CustomError('Image cannot be bigger than 500 KB', 400));
    // }
    // let imageName = image.name.split('.')[0] + new Date().getTime().toString() + '.' + image.name.split('.')[1];
    // let savedImage = await image.mv(path.join(__dirname, '..', 'uploads', 'posts', imageName));
    // const newPost = new PostModel({ ...userData, image: path.join('uploads', 'posts', imageName), userId: req.user._id });

    const newPost = new PostModel({ ...userData, image: req.file.path, userId: req.user._id }); //* ovo je jedina izmena
    const savedPost = await newPost.save();
    if (!savedPost) return next(new CustomError('An error occurred, please try later', 500));

    res.status(200).json({
        status: 'success',
        message: 'You have successufully added new Post',
    });
});

const deleteSinglePost = asyncErrorHandler(async (req, res, next) => {
    const user = req.user;
    const { postId, userId } = req.params;
    if (user.role !== 'admin' && user._id.toString() !== userId) {
        return next(new CustomError('You do not have permission to delete this post.', 403));
    }
    const deletedPost = await PostModel.findByIdAndDelete(postId);
    if (!deletedPost) return next(new CustomError('An error occurred, post has not been deleted. Please try later.', 500));
    const deletedComments = await CommentModel.deleteMany({ postId });
    const deletedLikes = await LikeModel.deleteMany({ postId });
    const parts = deletedPost.image.split('/');
    const imageName = parts.pop().split('.')[0];
    const folderName = parts[parts.length - 1];
    const deletedImage = await cloudinary.uploader.destroy(`${folderName}/${imageName}`);
    // fs.unlink(deletedPost.image, (err) => {
    //     if (err) return next(new CustomError('Image of post has not been deleted.', 500));
    // });
    if (!deletedComments.acknowledged)
        return next(new CustomError('An error occurred, post comments have not been deleted. Please try later.', 500));
    if (!deletedLikes.acknowledged)
        return next(new CustomError('An error occurred, post likes have not been deleted. Please try later.', 500));
    if (deletedImage.result !== 'ok') return next(new CustomError('An error occurred, image has not been deleted.', 500));

    res.status(200).json({
        status: 'success',
        message: 'Post has been deleted successufully',
    });
});

module.exports = { getAllPosts, getPostsByTag, getSinglePost, getPostsByUser, getPostsBySearch, addNewPost, deleteSinglePost };
