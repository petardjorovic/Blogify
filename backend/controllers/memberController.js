const asyncErrorHandler = require('../utils/asyncErrorHandler');
const UserModel = require('../models/UserModel');
const CustomError = require('../utils/CustomError');
const mongoose = require('mongoose');
const deleteUserCascade = require('../transactions/deleteUserCascade');

const getAllMembers = asyncErrorHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const member = req.query.member?.trim() || '';
    const parts = member.split(' ').filter(Boolean);

    const regexParts = parts.map((part) => ({
        $or: [{ firstName: { $regex: part, $options: 'i' } }, { lastName: { $regex: part, $options: 'i' } }],
    }));

    let match = { activate: true };

    if (parts.length > 0) {
        match.$and = regexParts;
    }

    const members = await UserModel.aggregate([
        { $match: match },
        { $sort: { createdAt: -1 } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);
    const membersCount = await UserModel.countDocuments(match);
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

const deleteMember = asyncErrorHandler(async (req, res, next) => {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        return next(new CustomError('Invalid userId format', 400));
    }
    const isAdmin = req.user.role === 'admin';
    if (!isAdmin) return next(new CustomError('You do not have permission to delete this member.', 403));
    if (req.user._id.toString() === userId) return next(new CustomError('You cannot delete your own account.', 400));
    const deletedUser = await deleteUserCascade(userId);
    res.status(200).json({
        status: 'success',
        message: 'Member has been successfully deleted.',
    });
});

module.exports = { getAllMembers, getMemberInfo, deleteMember };
