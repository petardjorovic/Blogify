const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id: {
        type: Schema.Types.ObjectId,
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
});

const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        type: { userSchema },
    },
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;
