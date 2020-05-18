import express from "express";
import Room from "./roomModel";
import Server from '../server/serverModel';
import Chat from "../messages/chatModel"
import mongoose = require("mongoose");
export class RoomController {
    //TOTO: add an entry to the rooms table
    public CreateRoom(req: express.Request, res: express.Response): void {
        var newRoom = new Room({server: req.body.serverid,name: req.body.name, type: req.body.type});
        var newRoomid = newRoom._id;
        Server.findOneAndUpdate({ _id: req.body.serverid }, {$push:{ Rooms: newRoomid}}, function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                
            });
        });
        newRoom.save((err, room) => {
            if (err) {
                res.send(err);
            }
            else {
                return res.send({ fn: 'Added Room', status: 'success' });
            }
        });
        
    }

    public SendRoomChat(req: express.Request, res: express.Response): void {
        //TODO: add a message to the RoomMessage table and ping users to trigger refreshroomchat
        const roomId = req.body.roomid
        var message = new Chat({ username: req.body.username, time: req.body.time, content: req.body.content });
        Room.findOneAndUpdate({ _id: roomId }, { $push: { messages: message._id } }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    message.save(function (err) {
                        if (err) {
                            return res.sendStatus(500).end();
                        }
                        else {
                            return res.send({ fn: 'Message Sent', status: 'success' });
                        }
                    });
                }
            });
        });
    }


    public RefreshRoomChat(req: express.Request, res: express.Response): void {
        //TODO: return list of of every message
        var messages : any[]= [];
        var _room : any;
        Room.findOne({ _id: req.query.roomid }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            _room = room;
        }).then(async function (room) {
            if (_room.messages.length != 0) {
                for (var i = 0; i < _room.messages.length; i++) {
                    await Chat.findOne({ _id: _room.messages[i] }, function (err, msg) {
                        if (!err && msg != null) {
                    
                        messages.push(msg); 
                        }      
                    }      
                    );
                }  
            }
            return res.json(messages);
        });
        
    }

    public JoinRoomVoice(req: express.Request, res: express.Response): void {
        //TODO: return list of who is in the voice room and trigger peers to connect to you
        const roomVoiceId = req.query.roomVoiceId;
        Room.findOneAndUpdate({ _id: roomVoiceId }, { $push: { users: req.body.username } }, function (err, room) {
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
    }

    public RefreshRoomVoice(req: express.Request, res: express.Response): void {
        //TODO: return list of of everyone in the voice room
        Room.findOne({ name: req.body.name }, "users", function (err, room) {
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

    }

    public JoinRoomVideo(req: express.Request, res: express.Response): void {
        //TODO: return list of who is in the video room and trigger peers to connect to you
        const roomVideoId = req.query.roomVideoId;
        Room.findOneAndUpdate({ _id: roomVideoId }, { $push: { users: req.body.username } }, function (err, room) {
            if (err || room == null) {
                return res.sendStatus(500).end();
            }
            room.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end()
                }
                else {
                    return res.send({ fn: 'Joine Video Room', status: 'success' });
                }
            });
        });
    }

    public RefreshRoomVideo(req: express.Request, res: express.Response): void {
        //TODO: return list of of everyone in the video room
        Room.findOne({ name: req.body.name }, "users", function (err, room) {
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
    }


}