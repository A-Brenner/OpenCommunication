import mongoose = require("mongoose");

const Schema = mongoose.Schema;


export interface Friends extends mongoose.Document{
    username: string;
    messages: Array<mongoose.Types.ObjectId>;
}

const FriendsSchema: mongoose.Schema = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    messages: [{
        type: mongoose.Types.ObjectId
    }]
});


export default mongoose.model<Friends>("Friends", FriendsSchema);