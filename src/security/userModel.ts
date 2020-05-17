import bcrypt from 'bcrypt';
import mongoose = require("mongoose");


const Schema = mongoose.Schema;


export interface IUser extends mongoose.Document {
    username: string;
    password:string;
    friendrequests: mongoose.Types.Array<string>;
    friends: Array<mongoose.Types.ObjectId>;
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
        types: mongoose.Types.ObjectId
    }]
});

UserSchema.methods.validatePassword = function(password:string): boolean{
    if (this.password==='*') {return false;}
    return bcrypt.compareSync(password,this.password);
}

export default mongoose.model<IUser>("User",UserSchema);
