const asyncErrorHandler = require('../utils/asyncErrorHandler');
const LikeModel = require('../models/LikeModel');
const CustomError = require('../utils/CustomError');

const handlePostLike = asyncErrorHandler(async (req, res, next) => {
    const { postId, userLike } = req.params;
    const { user } = req;
    if (userLike === 'dislike') {
        const deletedLike = await LikeModel.deleteOne({ userId: user._id, postId });
        if (deletedLike?.acknowledged !== true || deletedLike?.deletedCount !== 1) {
            return next(new CustomError('Something went wrong, please try later', 500));
        }
        return res.status(200).json({
            status: 'success',
            message: 'You have disliked this post',
        });
    } else if (userLike === 'like') {
        const newLike = new LikeModel({ userId: user._id, firstName: user.firstName, lastName: user.lastName, postId });
        const savedLike = await newLike.save();
        if (!savedLike) return next(new CustomError('Something went wrong, please try later', 500));

        return res.status(200).json({
            status: 'success',
            message: 'You have liked this post',
        });
    } else {
        return next(new CustomError('Something went wrong with your request.', 400));
    }
});

module.exports = { handlePostLike };
