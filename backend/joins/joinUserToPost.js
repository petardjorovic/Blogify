const joinUserToPost = [
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
                        image: true,
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
];

module.exports = joinUserToPost;
