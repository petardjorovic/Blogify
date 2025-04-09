const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    postId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    user: {
        id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
    updatedAt: {
        type: Date,
        default: null,
    },
});

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;
