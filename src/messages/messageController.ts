import express from "express";
import { Config } from '../config';
import User from '../security/userModel';
import Friends from '../messages/friendsModel';
import mongoose = require("mongoose");
import Chat from "./chatModel"


export class MessageController {

    public SendFriendChat(req: express.Request, res: express.Response): void {
        //TODO: add a message to the PersonalMessage table and ping Accounts to trigger refreshfriendchat
        var message = new Chat({username : req.body.username, time: req.body.time, content: req.body.content });
        Friends.findOneAndUpdate({ username: req.body.from }, { $push: { messages: message._id } }, function (err, friend) {
            if (err || friend == null) {
                return res.sendStatus(500).end();
            }
            friend.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    message.save(function (err) {
                        if (err) {
                            return res.sendStatus(500).end();
                        }
                        else{
                    return res.send({ fn: 'Message Sent', status: 'success' });
                        }
                });
            }
            });
        });
    }
    public RefreshFriendChat(req: express.Request, res: express.Response): void {
        //TODO: return list of of every message after the last one. 
        User.findOne({ username: req.body.username }, "friends",function (err, friends) {
            if (err || friends == null) {
                return res.sendStatus(500).end();
            }
            friends.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success', friends});
                }
            });
        }); 
    }
    public AddFriend(req: express.Request, res: express.Response): void {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        User.findOneAndUpdate({ username: req.body.from }, { $push: { friendrequests: { username: req.body.to } } }, function (err, server) {
            if (err || server == null) {
                return;
            }
            server.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        });
        User.findOneAndUpdate({ username: req.body.to }, { $push: { friendrequests: { username: req.body.from } } }, function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joined Server', status: 'success' });
                }
            });
        });
    }
    public DeclineFriend(req: express.Request, res: express.Response): void {
        User.findOneAndUpdate({ username: req.body.to }, { $pull: { friendrequests: { username: req.body.from } } }, function (err, server) {
            if (err || server == null) {
                return;
            }
            server.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        });
        User.findOneAndUpdate({ username: req.body.from }, { $pull: { friendrequests: { username: req.body.to } } }, function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joined Server', status: 'success' });
                }
            });
        });
    }
    public AcceptFriend(req: express.Request, res: express.Response): void {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        var Friendrequester = new Friends({ username: req.body.from });
        var Friendrequestee = new Friends({ username: req.body.to });
        User.findOneAndUpdate({ username: req.body.to }, {$push: {friends:Friendrequester._id}} , function (err, user) {
            if (err || user == null) {
                return;
            }
            user.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        });
        User.findOneAndUpdate({ username: req.body.from}, {$push:{friends:Friendrequestee._id}}, function (err, user) {
            if (err || user == null) {
                return;
            }
            user.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        }); 
        User.findOneAndUpdate({ username: req.body.from }, { $pull: { friendrequests: { username: req.body.to } } }, function (err, server) {
            if (err || server == null) {
                return;
            }
            server.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        });
        User.findOneAndUpdate({ username: req.body.to }, { $pull: { friendrequests: { username: req.body.from } } }, function (err, user) {
            if (err || user == null) {
                return ;
            }
            user.save(function (err) {
                if (user) {
                    return res.send({ fn: 'Joined Server', status: 'success' });
                }
                else {
                    return res.send({ fn: 'Joined Server', status: 'success' });
                }
            });
        });
    }
    public RemoveFriend(req: express.Request, res: express.Response): void {
        //TODO: remove an entry in the friends table and ping Accounts to trigger refreshfriends
        User.findOneAndUpdate({ username: req.body.from }, { $pull: { friends: req.body.toId } }, function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Joined Server', status: 'success' });
                }
            });
        });
        User.findOneAndUpdate({ username: req.body.to }, {$pull:{friends: req.body.fromId}}, function (err, server) {
            if (err || server == null) {
                return;
            }
            server.save(function (err) {
                if (err) {
                    return;
                }
                else {
                    return;
                }
            });
        }); 
    }
    public RefreshFriends(req: express.Request, res: express.Response): void {
        //TODO: return a list of all of a Accounts friends 
        User.findOne({ username: req.body.username }, "friends",function (err, friends) {
            if (err || friends == null) {
                return res.sendStatus(500).end();
            }
            friends.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success', friends});
                }
            });
        }); 
    }
    public RequestPhotos(req: express.Request, res: express.Response): void {
        //TODO: return photos for the Accounts requested
    }
}