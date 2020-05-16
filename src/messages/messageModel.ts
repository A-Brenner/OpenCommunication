import mongoose = require("mongoose");
import {Friends} from './friendsModel';

const Schema = mongoose.Schema;

export interface Messages extends mongoose.Document{
    username: string;
    friendrequests: mongoose.Types.Array<string>;
    friends: Friends['_id'];
}


const MessageSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    friendrequests: [{
        username: {
            type: String,
            required: "username is required"
        }
    }],
    friends: [{
        type: mongoose.Types.ObjectId
    }]
});


export default mongoose.model<Messages>("Messages", MessageSchema);
