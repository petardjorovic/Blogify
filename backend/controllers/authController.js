const UserModel = require('../models/UserModel');
const bcrypt = require('bcryptjs');
const SALT = 10;

const login = async (req, res, next) => {
    const foundUser = await UserModel.findOne({ email: req.body.email }).select('+password');
    if (!foundUser) {
        return res.status(201).json({
            message: "User with this email doesn't exist. Please register first",
        });
    }
    const checkPassword = await bcrypt.compare(req.body.password, foundUser.password);
    if (!checkPassword) {
        return res.status(204).json({
            message: 'Wrong credentials!',
        });
    }
    const token = 'blsdlsmdlsdmsldsdsd';
    res.status(200).json({
        message: 'You have logged in',
        token,
    });
};

const register = async (req, res, next) => {
    try {
        const foundUser = await UserModel.findOne({ email: req.body.email });
        if (foundUser) {
            return res.status(201).json({
                message: 'User with this email already exists',
            });
        }
        const passwordHash = await bcrypt.hash(req.body.password, SALT);
        const user = new UserModel({ ...req.body, password: passwordHash });
        const savedUser = await user.save();
        console.log(savedUser, 'savedUser');
        res.status(200).json({
            message: 'You have successufully registered',
        });
    } catch (err) {
        console.error(err);
        res.status(404).json({
            message: err.message,
        });
    }
};

module.exports = { login, register };
