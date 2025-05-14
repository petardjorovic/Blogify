const UserModel = require('../models/UserModel');
const asyncErrorHandler = require('./asyncErrorHandler');
const CustomError = require('./CustomError');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const protect = asyncErrorHandler(async (req, res, next) => {
    //* 1. Da li postoji token
    if (!req.headers.hasOwnProperty('authorization') || !req.headers.authorization.startsWith('Bearer')) {
        return next(new CustomError('You are not logged in', 401));
    }
    const token = req.headers.authorization.split(' ')[1];

    //* 2. Da li je token validan
    let decoded;
    try {
        decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new CustomError('Invalid or expired token, you have to login again.', 401));
    }

    //* 3. Da li postoji user sa tim tokenom
    const user = await UserModel.findById(decoded.id).select('+password');
    if (!user) return next(new CustomError('There is no user with this ID.', 401));

    //*4. Da li je mozda korisnik promenio password

    //* 5. Na kraju cemo da setujemo korisnika i da nastavimo u sledeci middleware
    req.user = user;
    next();
});

module.exports = { protect };
