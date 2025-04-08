const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
    },
    _id: false,
});

const postSchema = new Schema({
    body: {
        type: String,
        default: '',
    },
    createdAt: {
        type: Date,
        default: () => new Date().getTime(),
    },
    image: {
        type: String,
        default: null,
    },
    isPublic: {
        type: Boolean,
        default: true,
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
});

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
