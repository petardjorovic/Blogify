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
    await new Email({ email: newUser.email, firstName: newUser.firstName }, `http://localhost:5173/activation/${actToken}`).sendWelcome();
    res.status(200).json({
        status: 'success',
        message: 'Registration successful! Please check your email for the activation link (valid for 24 hours).',
    });
});

const restoreUser = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    });
});

const checkUserActivation = asyncErrorHandler(async (req, res, next) => {
    const { token } = req.params;
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    } catch (error) {
        console.error(error);
        return next(new CustomError('Your token has been expired or not valid.', 403));
    }
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

module.exports = { login, register, restoreUser, checkUserActivation };
