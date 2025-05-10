const joinPostToLike = [
    {
        $lookup: {
            from: 'posts',
            localField: 'postId',
            foreignField: '_id',
            as: 'post',
            pipeline: [
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
            ],
        },
    },
    {
        $unwind: {
            path: '$post',
            preserveNullAndEmptyArrays: true, // prikazi commentar cak i ako ne postoji vise taj post
        },
    },
];

module.exports = joinPostToLike;
