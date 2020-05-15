"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ServerSchema = new Schema({
    Name: {
        type: String,
    },
    Rooms: [{
            Id: {
                type: mongoose.Types.ObjectId
            }
        }],
    Users: [{
            username: {
                type: String
            }
        }]
});
exports.default = mongoose.model("Server", ServerSchema);
//# sourceMappingURL=serverModel.js.map