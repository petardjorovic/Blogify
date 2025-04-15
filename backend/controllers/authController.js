const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const CustomError = require('../utils/CustomError');
const asyncErrorHandler = require('../utils/asyncErrorHandler');
const SALT = 10;
const signToken = require('../utils/signToken');

const login = asyncErrorHandler(async (req, res, next) => {
    const foundUser = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!foundUser) {
        return next(new CustomError("User with this email doesn't exist. Please register first", 404));
    }
    const isPasswordValid = await foundUser.isPasswordCorrect(req.body.password, foundUser.password);
    if (!isPasswordValid) return next(new CustomError('Wrong credentials', 401));

    const payload = { id: foundUser._id, role: foundUser.role };
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
    const checkUser = await UserModel.findOne({ email: req.body.email });
    if (checkUser) return next(new CustomError('There is already user with this email', 400));
    const user = new UserModel({ ...req.body });
    const savedUser = await user.save();
    res.status(200).json({
        status: 'success',
        message: 'You have successufully registered',
    });
});

const restoreUser = asyncErrorHandler(async (req, res, next) => {
    res.status(200).json({
        status: 'success',
        user: req.user,
    });
});

module.exports = { login, register, restoreUser };
