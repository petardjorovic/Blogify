const joinPostToComment = [
    {
        $lookup: {
            from: 'posts',
            localField: 'postId',
            foreignField: '_id',
            as: 'post',
        },
    },
    {
        $unwind: {
            path: '$post',
            preserveNullAndEmptyArrays: true,
        },
    },
];

module.exports = joinPostToComment;
