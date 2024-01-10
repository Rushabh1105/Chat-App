import mongoose from "mongoose";



const chatSchema = new mongoose.Schema({
    userName: String,
    message: String,
    timeStamp: Date,
});

export const ChatModel = new mongoose.model('Chat', chatSchema);

