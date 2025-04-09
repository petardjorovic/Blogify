const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        _id: false,
        versionKey: false,
    }
);

const postSchema = new Schema({
    body: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
        required: true,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    reactions: {
        type: Number,
        default: 0,
    },
    tags: {
        type: [tagSchema],
    },
    title: {
        type: String,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
});

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
