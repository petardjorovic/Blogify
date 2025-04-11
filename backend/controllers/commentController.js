const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CommentModel = require('../models/CommentModel');
const CustomError = require('../utils/CustomError');

const addComment = asyncErrorHandler(async (req, res, next) => {
    const user = {
        id: req.user._id,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
    };
    const newComment = new CommentModel({ ...req.body, user });
    const savedComment = await newComment.save();
    if (!savedComment) return next(new CustomError('An error occured, please try again later', 500));

    res.status(200).json({
        status: 'success',
        message: 'You have successufully added comment',
    });
});

module.exports = { addComment };
