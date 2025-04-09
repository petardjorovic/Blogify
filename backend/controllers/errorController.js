const CustomError = require('../utils/CustomError');

const devError = (error, res) => {
    console.log(error, 'error iz devError petre');

    return res.status(error.statusCode).json({
        status: error.status,
        message: error.message,
        stack: error.stack,
        error,
    });
};

const prodError = (error, res) => {
    if (error.isOperational) {
        return res.status(error.statusCode).json({
            status: error.status,
            message: error.message,
        });
    } else {
        console.error(error, 'nepoznata greska Petre');
        return res.status(500).json({
            status: 'error',
            message: 'Something went wrong. Please try again later',
        });
    }
};

const castErrorHandler = (error) => {
    const message = `Invalid value for ${error.path}: ${error.value}`;
    return new CustomError(message, 400);
};

const duplicateKeyErrorHandler = (error) => {
    const [key] = Object.keys(error.keyValue);
    const [value] = Object.values(error.keyValue);
    const message = `There is already ${key} with value ${value}. Please use another value`;
    return new CustomError(message, 400);
};

const validationErrorHandler = (error) => {
    const messages = Object.values(error.errors).map((el) => el.message);
    const message = messages.join('. ');
    return new CustomError(message, 400);
};

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        devError(error, res);
    } else if (process.env.NODE_ENV === 'production') {
        if (error.name === 'CastError') error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyErrorHandler(error);
        if (error.name === 'ValidationError') error = validationErrorHandler(error);
        prodError(error, res);
    }
};
