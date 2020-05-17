import mongoose = require("mongoose")

const Schema = mongoose.Schema;

export interface IRoom extends mongoose.Document {
    server:mongoose.Types.ObjectId;
    name:string;
    type:string;
    messages: Array<mongoose.Types.ObjectId>;
}
const RoomSchema = new Schema({
    server: {
        type: mongoose.Types.ObjectId,
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
        type: mongoose.Types.ObjectId
    }],
})


export default mongoose.model<IRoom>("Room",RoomSchema);