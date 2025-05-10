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
            preserveNullAndEmptyArrays: true, // prikazuje i komentare na postovima koji vise ne postoje
        },
    },
];

module.exports = joinPostToComment;
