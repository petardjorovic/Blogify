const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({});

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
