const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const SALT = 10;
const signToken = require('../utils/signToken');
const Email = require('../utils/Email');
const activationToken = require('../utils/activationToken');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const crypto = require('crypto');
const validator = require('validator');

const login = asyncErrorHandler(async (req, res, next) => {
    if (!req.body.email || !req.body.password) {
        return next(new CustomError('Please provide email and password for login in!', 400));
    }
    const foundUser = await UserModel.findOne({ email: req.body.email, activate: true }).select('+password');

    if (!foundUser || !(await foundUser.isPasswordCorrect(req.body.password, foundUser.password))) {
        return next(new CustomError('Invalid login credentials or inactive account.', 400));
    }

    const payload = { id: foundUser._id };
    const token = signToken(payload);
    const { password, __v, ...restData } = foundUser.toObject();

    res.status(200).json({
        status: 'success',
        message: 'You have logged in',
        user: restData,
        token,
    });
});

const register = asyncErrorHandler(async (req, res, next) => {
    req.body.role = undefined;
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) return next(new CustomError('There is already user with this email', 400)); // ovo ce i sama mongoose validacija da resi preko duplikateKey
    const user = new UserModel({ ...req.body });
    const savedUser = await user.save();
    if (!Object.hasOwn(savedUser?.toObject(), '_id')) {
        return next(new CustomError('Something went wrong, please try again later.', 500));
    }
    const newUser = savedUser.toObject();
    const actToken = activationToken({ id: newUser._id });
    try {
        await new Email(
            { email: newUser.email, firstName: newUser.firstName },
            `http://localhost:5173/activation/${actToken}`
        ).sendWelcome();

        res.status(200).json({
            status: 'success',
            message: 'Registration successful! Please check your email for the activation link (valid for 24 hours).',
        });
    } catch (error) {
        console.error(error, 'register activation send email error');
        await UserModel.findByIdAndDelete(savedUser._id);
        return next(new CustomError('An error occurred, please try again later.', 500));
    }
});

const restoreUser = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    });
});

const checkUserActivation = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.params;
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    const user = await UserModel.findById(decoded.id);
    if (!user) return next('User not found', 404);
    if (user.activate) {
        return res.status(200).json({
            status: 'info',
            message: 'You have already activated your account.',
        });
    }
    user.activate = true;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({
        status: 'success',
        message: 'You have successufully activated your account.',
    });
});

const changePassword = asyncErrorHandler(async (req, res, next) => {
    const user = await UserModel.findById(req.user._id).select('+password');
    const isPasswordValid = await user.isPasswordCorrect(req.body.currentPassword, user.password);
    if (!isPasswordValid) return next(new CustomError('The Current password you provided is wrong', 400));
    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmNewPassword;
    user.passwordChangedAt = Date.now();
    await user.save();
    res.status(200).json({
        status: 'success',
        message: 'Password successfully changed!',
    });
});

const forgotPassword = asyncErrorHandler(async (req, res, next) => {
    // 1. GET A USER BASED ON A POSTED EMAIL
    const { email } = req.body;
    if (!validator.isEmail(email)) return next(new CustomError('Please enter a valid email', 400));
    const user = await UserModel.findOne({ email });
    if (!user) return next(new CustomError('We could not find user with given email', 404));

    // 2. GENERATE A RANDOM RESET TOKEN
    const resetToken = user.createResetPasswordToken();

    await user.save({ validateBeforeSave: false });
    // 3. SEND THE TOKEN BACK TO THE USER EMAIL

    try {
        await new Email(
            { email: user.email, firstName: user.firstName },
            `http://localhost:5173/resetPassword/${resetToken}`
        ).sendResetPassword();

        res.status(200).json({
            status: 'success',
            message: 'Password reset link has been sent to your email address',
        });
    } catch (err) {
        console.error(err, 'reset password email err');
        user.passwordResetToken = undefined;
        user.passwordResetTokenExpires = undefined;
        await user.save({ validateBeforeSave: false });

        return next(new CustomError('There was an error sending password reset email. Please try again later', 500));
    }
});

const resetPassword = asyncErrorHandler(async (req, res, next) => {
    // 1. IF THE USER EXISTS WITH THE GIVEN TOKEN OR TOKEN HAS NOT EXPIRED
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await UserModel.findOne({ passwordResetToken: hashedToken, passwordResetTokenExpires: { $gt: Date.now() } });

    if (!user) return next(new CustomError('Your reset password link is invalid or has expired', 400));

    // 2. RESETING THE USER PASSWORD
    user.password = req.body.newPassword;
    user.confirmPassword = req.body.confirmNewPassword;
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpires = undefined;
    user.passwordChangedAt = Date.now();

    const savedUser = await user.save();
    if (!savedUser) return next(new CustomError('An error occurred on server side, please try again later', 500));
    res.status(200).json({
        status: 'success',
        message: 'You have successufully reset your password, now you have to login with new password',
    });
});

const checkResendActivationLink = asyncErrorHandler(async (req, res, next) => {
    if (!validator.isEmail(req.body.email)) return next(new CustomError('Please enter a valid email', 400));
    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return next(new CustomError('User not found', 404));
    if (user.activate) return next(new CustomError('The user account is already activated', 409));

    const actToken = activationToken({ id: user._id });

    try {
        await new Email(
            { email: user.email, firstName: user.firstName },
            `http://localhost:5173/activation/${actToken}`
        ).resendActivation();

        res.status(200).json({
            status: 'success',
            message: 'The activation link has just been sent. Please check your email for the activation link (valid for 24 hours).',
        });
    } catch (error) {
        console.error(error, 'resend activation send email error');
        return next(new CustomError('An error occurred, please try again later.', 500));
    }
});

module.exports = {
    login,
    register,
    restoreUser,
    checkUserActivation,
    changePassword,
    forgotPassword,
    resetPassword,
    checkResendActivationLink,
};
