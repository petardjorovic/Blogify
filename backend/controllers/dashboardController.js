const UserModel = require('../models/UserModel');
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
    res.send('ok');
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

module.exports = { getDashboardHomePosts, getDasboardUserProfile, updateProfileImage, updateProfileInfo };
