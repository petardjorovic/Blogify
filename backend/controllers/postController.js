const asyncErrorHandler = require('../utils/asyncErrorHandler');
const CustomError = require('../utils/CustomError');
const PostModel = require('../models/PostModel');

const getAllPosts = asyncErrorHandler(async (req, res, next) => {
    const posts = await PostModel.aggregate([
        {
            $limit: 9,
        },
        {
            $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'user',
                pipeline: [
                    {
                        $project: {
                            _id: true,
                            firstName: true,
                            lastName: true,
                        },
                    },
                ],
            },
        },
        {
            $unwind: {
                path: '$user',
                preserveNullAndEmptyArrays: true,
            },
        },
    ]);

    res.status(200).json({
        status: 'success',
        posts,
    });
});

module.exports = { getAllPosts };
