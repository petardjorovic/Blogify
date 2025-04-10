const mongoose = require('mongoose');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const PostModel = require('../models/PostModel');
const joinUserToPost = require('../joins/joinUserToPost');

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
    const posts = await PostModel.aggregate([
        {
            $limit: 9,
        },
        ...joinUserToPost,
    ]);

    if (!posts) return next(new CustomError('There are no posts', 404));

    res.status(200).json({
        status: 'success',
        posts,
    });
});

const getSinglePost = asyncErrorHandler(async (req, res, next) => {
    const [post] = await PostModel.aggregate([
        {
            $match: { _id: new mongoose.Types.ObjectId(req.params.postId) },
        },
        ...joinUserToPost,
    ]);
    if (!post) return next(new CustomError(`Post with id ${req.params.postId} not found.`));

    res.status(200).json({
        status: 'success',
        post,
    });
});

const getPostsByTag = asyncErrorHandler(async (req, res, next) => {
    const { tagName } = req.params;
    const posts = await PostModel.aggregate([
        {
            $match: { 'tags.name': tagName },
        },
        {
            $limit: 9,
        },
        ...joinUserToPost,
    ]);

    if (!posts) return next(new CustomError(`There are no posts by tag name ${tagName}`, 404));

    res.status(200).json({
        status: 'success',
        posts,
    });
});

module.exports = { getAllPosts, getPostsByTag, getSinglePost };
