"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RoomSchema = new Schema({
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
});
exports.default = mongoose.model("Server", RoomSchema);
//# sourceMappingURL=roomModel.js.map