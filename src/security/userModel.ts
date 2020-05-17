import bcrypt from 'bcrypt';
import mongoose = require("mongoose");
import {Friends} from '../messages/friendsModel';

const Schema = mongoose.Schema;


export interface IUser extends mongoose.Document {
    username: string;
    password:string;
    friendrequests: mongoose.Types.Array<string>;
    friends: Friends['_id'];
    validatePassword(password: string): boolean;
    encryptString(password: string):string;
}  

const UserSchema: mongoose.Schema = new Schema({

    username: {
        type: String,
        required: "username is required"
    },
    password: {
        type: String,
        required: "password is required"
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

UserSchema.methods.validatePassword = function(password:string): boolean{
    if (this.password==='*') {return false;}
    return bcrypt.compareSync(password,this.password);
}

export default mongoose.model<IUser>("User",UserSchema);
