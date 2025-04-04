const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
    console.log(req.user, 'req.user');

    res.status(200).json({
        status: 'success',
        message: 'All posts',
    });
});

module.exports = { getAllPosts };
