"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var roomModel_1 = __importDefault(require("./roomModel"));
var RoomController = /** @class */ (function () {
    function RoomController() {
    }
    //TOTO: add an entry to the rooms table
    RoomController.prototype.CreateRoom = function (req, res) {
        var newRoom = new roomModel_1.default(req.body);
        newRoom.save(function (err, room) {
            if (err) {
                res.send(err);
            }
            res.json(room);
        });
    };
    RoomController.prototype.SendRoomChat = function (req, res) {
        //TODO: add a message to the RoomMessage table and ping users to trigger refreshroomchat
        var roomChatId = req.query.roomChatId;
        roomModel_1.default.findOneAndUpdate({ _id: roomChatId }, { $push: { messages: req.body.content } }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Message Sent', status: 'success' });
                }
            });
        });
    };
    RoomController.prototype.RefreshRoomChat = function (req, res) {
        //TODO: return list of of every message after the last one.
        roomModel_1.default.findOne({ messages: req.body.content }, "Messages", function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Messages retrieved', status: 'success' });
                }
            });
        });
    };
    RoomController.prototype.JoinRoomVoice = function (req, res) {
        //TODO: return list of who is in the voice room and trigger peers to connect to you
        var roomVoiceId = req.query.roomVoiceId;
        roomModel_1.default.findOneAndUpdate({ _id: roomVoiceId }, { $push: { users: req.body.username } }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joined Voice Room', status: 'success' });
                }
            });
        });
    };
    RoomController.prototype.RefreshRoomVoice = function (req, res) {
        //TODO: return list of of everyone in the voice room
        roomModel_1.default.findOne({ name: req.body.name }, "users", function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Users retrieved', status: 'success' });
                }
            });
        });
    };
    RoomController.prototype.JoinRoomVideo = function (req, res) {
        //TODO: return list of who is in the video room and trigger peers to connect to you
        var roomVideoId = req.query.roomVideoId;
        roomModel_1.default.findOneAndUpdate({ _id: roomVideoId }, { $push: { users: req.body.username } }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joine Video Room', status: 'success' });
                }
            });
        });
    };
    RoomController.prototype.RefreshRoomVideo = function (req, res) {
        //TODO: return list of of everyone in the video room
        roomModel_1.default.findOne({ name: req.body.name }, "users", function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Users retrieved', status: 'success' });
                }
            });
        });
    };
    return RoomController;
}());
exports.RoomController = RoomController;
//# sourceMappingURL=roomController.js.map