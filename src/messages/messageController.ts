import express from "express";
import { Config } from '../config';
import User from '../security/userModel';
import Friends from '../messages/friendsModel';
import mongoose = require("mongoose");
import Chat from "./chatModel"


export class MessageController {

    public SendFriendChat(req: express.Request, res: express.Response): void {
        //TODO: add a message to the PersonalMessage table and ping Accounts to trigger refreshfriendchat
/*         User.findOne({ username: req.body.username }, function (err, messageDoc) {
            if (err || messageDoc == null) {
                return res.sendStatus(500).end();
            }
            var message = new Chat({ time: Date.now , content: req.body.content});
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'message sent', status: 'success' });
                }
            });
        }); */
    }
    public RefreshFriendChat(req: express.Request, res: express.Response): void {
        //TODO: return list of of every message after the last one. 
    }
    public AddFriend(req: express.Request, res: express.Response): void {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        User.findOneAndUpdate({ username: req.body.username }, {$push:{ friendrequests: {username: req.query.username}}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });
        const userId = req.query.userId;
        User.findOneAndUpdate({ _id: userId}, {$push:{ friendrequests: {username: req.body.username}}}, function (err, server) {
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
        User.findOneAndUpdate({ username: req.body.username }, {$pull:{ friendrequests: {username: req.query.username}}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });
        const userId = req.query.userId;
        User.findOneAndUpdate({ _id: userId}, {$pull:{ friendrequests: {username: req.body.username}}}, function (err, server) {
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
        User.findOneAndUpdate({ username: req.body.username }, {$pull:{ friendrequests: {username: req.query.username}}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });
        const userId = req.query.userId;
        User.findOneAndUpdate({ _id: userId}, {$pull:{ friendrequests: {username: req.body.username}}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });

        var Friendrequester = new Friends({ username: req.query.username, _id: userId});
        var Friendrequestee = new Friends({ username: req.body.username, _id: req.body.userId });
        User.findOneAndUpdate({ username: req.body.username }, {$push:{ friends: Friendrequester.username}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });
        User.findOneAndUpdate({ _id: userId}, {$push: {friends: Friendrequestee._id}}, function (err, server) {
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
    public RemoveFriend(req: express.Request, res: express.Response): void {
        //TODO: remove an entry in the friends table and ping Accounts to trigger refreshfriends
        const userId = req.query.userId;
        User.findOneAndUpdate({ _id: userId}, {$pull:{ friends: req.body.userId}}, function (err, server) {
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
        User.findOneAndUpdate({ username: req.body.username }, {$pull:{friends: req.query.userId}}, function (err, server) {
            if (err || server == null) {
                return ;
            }
            server.save(function (err) {
                if (err) {
                    return ;
                }
                else {
                    return ;
                }
            });
        });
    }
    public RefreshFriends(req: express.Request, res: express.Response): void {
        //TODO: return a list of all of a Accounts friends  
    }
    public RequestPhotos(req: express.Request, res: express.Response): void {
        //TODO: return photos for the Accounts requested
    }
}