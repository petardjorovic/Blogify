const asyncErrorHandler = require('../utils/asyncErrorHandler');
const TagModel = require('../models/TagModel');

const getAllTags = asyncErrorHandler(async (req, res, next) => {
    const tags = await TagModel.find().sort({ name: 1 });
    res.status(200).json({
        status: 'success',
        tags,
    });
});

module.exports = { getAllTags };
