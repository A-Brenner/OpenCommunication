"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var RoomSchema = new Schema({
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
});
exports.default = mongoose.model("Server", RoomSchema);
//# sourceMappingURL=roomModel.js.map