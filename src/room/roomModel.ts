import mongoose = require("mongoose")

const Schema = mongoose.Schema;

export interface IRoom extends mongoose.Document {
    name: string;
    type: string;
    messages: mongoose.Types.Array<string>;
    users: mongoose.Types.Array<string>;


}
const RoomSchema = new Schema({
    name: {
        type: String,
    },
    type: {
        type: String,
    },
    messages: [{
        userFrom: {
            type: String,
        },

        content: {
            type: String,
        }
    }],
    users: [{
        username: {
            type: String,
        }
    }]
})


export default mongoose.model<IRoom>("Room",RoomSchema);