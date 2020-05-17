import mongoose = require("mongoose");
import {Chat} from './chatModel';

const Schema = mongoose.Schema;


export interface Friends extends mongoose.Document{
    username: string;
    messages: Chat['_id'];
    _id: mongoose.Types.ObjectId;
}

const FriendsSchema: mongoose.Schema = new Schema({
    _id:{
        type: mongoose.Types.ObjectId
    },
    username: {
        type: String,
        required: "username is required"
    },
    messages: [{
        type: mongoose.Types.ObjectId
    }]
});


export default mongoose.model<Friends>("Friends", FriendsSchema);