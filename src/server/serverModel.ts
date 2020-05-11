import mongoose = require("mongoose");

const Schema = mongoose.Schema;

export interface IServer extends mongoose.Document {
    Name: string;
    Rooms: mongoose.Types.Array<mongoose.Types.ObjectId>;
    Users: mongoose.Types.Array<string>;
}  

const ServerSchema: mongoose.Schema = new Schema({
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

export default mongoose.model<IServer>("Server",ServerSchema);