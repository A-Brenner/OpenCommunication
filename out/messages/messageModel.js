"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MessageSchema = new Schema({
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
            username: {
                type: String,
                required: "username is required"
            },
            messages: [{
                    time: {
                        type: Date,
                        required: "Date is required"
                    },
                    content: {
                        type: String,
                        required: "Content is required"
                    }
                }]
        }]
});
exports.default = mongoose.model("Message", MessageSchema);
//# sourceMappingURL=messageModel.js.map