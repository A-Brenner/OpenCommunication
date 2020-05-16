import mongoose = require("mongoose");
import {Chat} from './chatModel';

const Schema = mongoose.Schema;


export interface Friends extends mongoose.Document{
    username: string;
    messages: Chat['_id'];
}

const FriendsSchema: mongoose.Schema = new Schema({
    friends: [{
        username: {
            type: String,
            required: "username is required"
        },
        messages: [{
            type: mongoose.Types.ObjectId
        }]
    }]
});


export default mongoose.model<Friends>("Message", FriendsSchema);