const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const PostModel = require('../models/PostModel');

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
    const posts = await PostModel.find({});

    res.status(200).json({
        status: 'success',
        posts,
    });
});

module.exports = { getAllPosts };
