const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CommentModel = require('../models/CommentModel');
const CustomError = require('../utils/CustomError');
const PostModel = require('../models/PostModel');
const joinPostToComment = require('../joins/joinPostToComment');

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

const deleteComment = asyncErrorHandler(async (req, res, next) => {
    const [comment] = await CommentModel.aggregate([
        {
            $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.commentId }] } },
        },
        ...joinPostToComment,
    ]);
    const isAdmin = req.user.role === 'admin';
    const isCommentAuthor = req.user._id.toString() === comment.user.id.toString();
    const isPostAuthor = req.user._id.toString() === comment.post.userId.toString();
    if (!isAdmin && !isCommentAuthor && !isPostAuthor) {
        return next(new CustomError('You do not have permission to delete this comment.', 403));
    }
    const deletedComment = await CommentModel.deleteOne({ _id: req.params.commentId });
    if (!deletedComment.acknowledged && deletedComment.deletedCount !== 1) {
        return next(new CustomError('An error occurred, please try later', 500));
    }
    res.status(200).json({
        status: 'success',
        message: 'You have successufully deleted comment',
    });
});

module.exports = { addComment, deleteComment };
