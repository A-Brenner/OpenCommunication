import mongoose = require("mongoose");

const Schema = mongoose.Schema;


export interface Chat extends mongoose.Document{
    time: Date;
    content: string;
}

const ChatSchema: mongoose.Schema = new Schema({
    time: {
        type: Date,
        required: "Date is required"
    },
    content: {
        type: String,
        required: "Content is required"
    }
});


export default mongoose.model<Chat>("Chat", ChatSchema);