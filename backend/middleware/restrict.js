const CustomError = require('../utils/CustomError');

const restrict =
    (...roles) =>
    (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(new CustomError('You dont have permission to perform this action.', 403));
        }
        next();
    };

module.exports = { restrict };
