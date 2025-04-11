const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema(
    {
        senderId: {
            type: Schema.Types.ObjectId,
            required: [true, 'SenderId is required'],
        },
        receiverId: {
            type: Schema.Types.ObjectId,
            required: [true, 'ReceiverId is required'],
        },
        message: {
            type: String,
            required: [true, 'Message is required'],
        },
        viewAt: {
            type: Date,
            default: mull,
        },
    },
    {
        timestamps: true,
    }
);

const MessageModel = mongoose.model('Message', messageSchema);
module.exports = MessageModel;
