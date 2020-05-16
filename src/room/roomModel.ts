import mongoose = require("mongoose")

const Schema = mongoose.Schema;

export const RoomSchema = new Schema({
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