// models/EmailNotification.js
import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Readed', 'Replied', 'Not replied'],
        default: 'Not replied'
    },
    repliedBY: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
    },
    repliedMessage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export const messageModel = mongoose.model('Message', messageSchema);
