const joinCommentsToPost = [
    {
        $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'postId',
            as: 'comments',
            pipeline: [{ $sort: { createdAt: -1 } }],
        },
    },
];

module.exports = joinCommentsToPost;
