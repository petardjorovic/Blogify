const joinLikesToPost = [
    {
        $lookup: {
            from: 'likes',
            localField: '_id',
            foreignField: 'postId',
            as: 'likes',
            pipeline: [{ $project: { userId: true, _id: false } }],
        },
    },
];

module.exports = joinLikesToPost;
