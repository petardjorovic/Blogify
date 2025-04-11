const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {
        id: { type: Schema.Types.ObjectId, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
    },
    {
        _id: false,
        versionKey: false,
    }
);

const commentSchema = new Schema(
    {
        body: {
            type: String,
            required: true,
        },
        postId: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        user: {
            type: userSchema,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const CommentModel = mongoose.model('Comment', commentSchema);
module.exports = CommentModel;
