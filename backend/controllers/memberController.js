const asyncErrorHandler = require('../utils/asyncErrorHandler');
const UserModel = require('../models/UserModel');
const CustomError = require('../utils/CustomError');

const getAllMembers = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const members = await UserModel.aggregate([{ $match: { activate: true } }, { $skip: (page - 1) * limit }, { $limit: limit }]);
    const membersCount = await UserModel.countDocuments();
    if (!members) return next(new CustomError('Users not found', 404));

    res.status(200).json({
        status: 'success',
        members,
        membersCount,
    });
});

const getMemberInfo = asyncErrorHandler(async (req, res, next) => {
    const [member] = await UserModel.aggregate([
        {
            $match: { $expr: { $eq: ['$_id', { $toObjectId: req.params.userId }] } },
        },
        {
            $lookup: {
                from: 'posts',
                localField: '_id',
                foreignField: 'userId',
                as: 'posts',
                pipeline: [{ $project: { _id: 1 } }],
            },
        },
        {
            $project: { password: 0 },
        },
    ]);
    if (!member) return next(new CustomError('User not found', 404));
    res.status(200).json({
        status: 'success',
        member,
    });
});

module.exports = { getAllMembers, getMemberInfo };
