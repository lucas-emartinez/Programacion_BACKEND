import  { Schema, model } from "mongoose";

const messagesSchema = new Schema({
    user: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
}, { timestamps: true });

export const messagesModel = model('Messages', messagesSchema);
