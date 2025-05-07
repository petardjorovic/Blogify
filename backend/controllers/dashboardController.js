const asyncErrorHandler = require('../utils/asyncErrorHandler');

const getDashboardHomePosts = asyncErrorHandler(async (req, res, next) => {
    console.log('tu sam');
    res.send('ok');
});

module.exports = { getDashboardHomePosts };
