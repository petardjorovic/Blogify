const CustomError = require('../utils/CustomError');
const logger = require('../utils/logger');

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
        logger.error(`UNEXPECTED ERROR | ${error.message} | ${error.stack}`);
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
    const message = `There is already ${key} with value ${value}. Please use another value.`;
    return new CustomError(message, 400);
};

const validationErrorHandler = (error) => {
    const messages = Object.values(error.errors).map((el) => el.message);
    const message = messages.join('. ');
    return new CustomError(message, 400);
};

const handleJWTError = (error) => {
    return new CustomError('Invaid token. Please login again.', 401);
};

const handleExpiredJWT = (error) => {
    return new CustomError('JWT has expired. Please login again!', 401);
};

const handleLimitFileError = (error) => {
    return new CustomError('Image is too big. Maximum size is 500 KB', 400);
};

module.exports = (error, req, res, next) => {
    error.statusCode = error.statusCode || 500;
    error.status = error.status || 'error';
    // console.log(`PATH: ${req.path}`, error);

    if (process.env.NODE_ENV === 'development') {
        devError(error, res);
    } else if (process.env.NODE_ENV === 'production') {
        // ✅ Loguj grešku pomoću winston-a
        logger.error(`${error.message} | ${req.method} ${req.originalUrl} | ${error.stack}`);
        if (error.name === 'CastError') error = castErrorHandler(error);
        if (error.code === 11000) error = duplicateKeyErrorHandler(error);
        if (error.name === 'ValidationError') error = validationErrorHandler(error);
        if (error.name === 'JsonWebTokenError') error = handleJWTError(error);
        if (error.name === 'TokenExpiredError') error = handleExpiredJWT(error);
        if (error.code === 'LIMIT_FILE_SIZE') error = handleLimitFileError(error);
        prodError(error, res);
    }
};
