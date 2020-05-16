import mongoose = require("mongoose")

const Schema = mongoose.Schema;

export interface IRoom extends mongoose.Document {

}
const RoomSchema = new Schema({
    server: {
        type: String,
        required: 'Server is required'
    },
    name: {
        type: String,
        required: 'Name is required'
    },
    type: {
        type: String,
        required: 'Type is requried'
    },
    messages: [{
        userFrom: {
            type: String,
            required: 'UserFrom is required'
        },
        time: {
            type: Date,
            required: 'Time is required'
        },
        content: {
            type: String,
            required: 'Content is required'
        }
    }],
    users: [{
        username: {
            type: String,
            required: 'Username is required'
        }
    }]
})


export default mongoose.model<IRoom>("Room",RoomSchema);