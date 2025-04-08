const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema({
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
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
});

const LikeModel = mongoose.model('Like', likeSchema);
module.exports = LikeModel;
