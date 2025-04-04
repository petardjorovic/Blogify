const UserModel = require('../models/UserModel');
const asyncErrorHandler = require('./asyncErrorHandler');
const CustomError = require('./CustomError');
const jwt = require('jsonwebtoken');

const protect = asyncErrorHandler(async (req, res, next) => {
    let decoded;
    //* 1. Da li postoji token
    if (!req.headers.hasOwnProperty('authorization')) {
        return next(new CustomError('You are not logged in', 401));
    }
    const token = req.headers.authorization.split(' ')[1];

    //* 2. Da li je token validan
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    } catch (err) {
        return next(new CustomError('Invalid or expired token, please login again', 401));
    }

    //* 3. Da li postoji user sa tim tokenom
    const user = await UserModel.findById(decoded.id);
    if (!user) return next(new CustomError('There si not user with this id', 401));

    //*4. Da li je mozda korisnik promenio password

    //* 5. Na kraju cemo da setujemo korisnika i da nastavimo u sledeci middleware
    req.user = user;
    next();
});

module.exports = { protect };
