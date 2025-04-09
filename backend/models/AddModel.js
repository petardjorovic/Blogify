const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const addSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    body: {
        type: String,
        required: [true, 'Body is required'],
    },
    image: {
        type: String,
        default: null,
    },
    startDate: {
        type: Date,
        default: () => new Date().getTime(),
    },
    endDate: {
        type: Date,
        default: null,
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    duration: {
        type: Number,
        required: [true, 'Duration is required'],
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'UserId is required'],
    },
});

const AddModel = mongoose.model('Add', addSchema);
module.exports = AddModel;
