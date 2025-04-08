const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tagSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
});

const TagModel = mongoose.model('Tag', tagSchema);
module.exports = TagModel;
