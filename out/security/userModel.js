"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: {
        type: String,
        required: "username is required"
    },
    password: {
        type: String,
        required: "password is required"
    }
});
UserSchema.methods.validatePassword = function (password) {
    if (this.password === '*') {
        return false;
    }
    return bcrypt_1.default.compareSync(password, this.password);
};
exports.default = mongoose.model("User", UserSchema);
//# sourceMappingURL=userModel.js.map