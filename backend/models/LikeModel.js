const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'First Name is required'],
        },
        lastName: {
            type: String,
            required: [true, 'Last Name is required'],
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: [true, 'PostId is required'],
        },
        userId: {
            type: Schema.Types.ObjectId,
            required: [true, 'UserId is required'],
        },
    },
    {
        timestamps: true,
    }
);

const LikeModel = mongoose.model('Like', likeSchema);
module.exports = LikeModel;
