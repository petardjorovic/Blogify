const asyncErrorHandler = require('../utils/asyncErrorHandler');
const LikeModel = require('../models/LikeModel');
const CustomError = require('../utils/CustomError');

const handlePostLike = asyncErrorHandler(async (req, res, next) => {
    const { postId } = req.body;
    const { user } = req;
    const userLike = await LikeModel.findOne({ userId: req.user._id, postId: req.body.postId });
    if (userLike) {
        const deletedLike = await LikeModel.findByIdAndDelete(userLike._id);
        if (!deletedLike) return next(new CustomError('Something went wrong, please try later', 500));
        return res.status(200).json({
            status: 'success',
            message: 'You have disliked this post',
        });
    } else {
        const newLike = new LikeModel({ userId: user._id, firstName: user.firstName, lastName: user.lastName, postId });
        const savedLike = await newLike.save();
        if (!savedLike) return next(new CustomError('Something went wrong, please try later', 500));

        return res.status(200).json({
            status: 'success',
            message: 'You have liked this post',
        });
    }
});

module.exports = { handlePostLike };
