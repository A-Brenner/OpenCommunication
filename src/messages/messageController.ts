import express from "express";
import { Config } from '../config';
import Messages from './messageModel';
import mongoose = require("mongoose");


export class MessageController {

    public SendFriendChat(req: express.Request, res: express.Response): void {
        //TODO: add a message to the PersonalMessage table and ping Accounts to trigger refreshfriendchat
        Messages.findOne({ username: req.body.username }, function (err, messageDoc) {
            if (err || messageDoc == null) {
                return res.sendStatus(500).end();
            }
            var message = new Messages({ time: Date.now , content: req.body.content});
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'message sent', status: 'success' });
                }
            });
        });
        const userId = req.query.userId;
        Messages.findOne({ _id: userId }, function (err, messageDoc) {
            if (err || messageDoc == null) {
                return res.sendStatus(500).end();
            }
            var message = new Messages({ time: Date.now , content: req.body.content});
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'message sent', status: 'success' });
                }
            });
        });
    }
    public RefreshFriendChat(req: express.Request, res: express.Response): void {
        //TODO: return list of of every message after the last one.
        Messages.findOne({Friends: { username: req.body.username }}, "messages",function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success' });
                }
            });
        });  
    }
    public AddFriend(req: express.Request, res: express.Response): void {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        const userId = req.query.userId;
        Messages.findOneAndUpdate({ _id: userId }, {$push: { friendrequests: {username: req.body.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request sent', status: 'success' });
                }
            });
        });
        Messages.findOneAndUpdate({ username: req.body.username}, {$push: { friendrequests: {username: req.query.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request sent', status: 'success' });
                }
            });
        });
    }
    public DeclineFriend(req: express.Request, res: express.Response): void {
        const userId = req.query.userId;
        Messages.findOneAndUpdate({ _id: userId }, {$pull: { friendrequests: {username: req.body.username}}}, function (err, user) {
            if (err || user == null) {
                return res.sendStatus(500).end();
            }
            user.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request removed', status: 'success' });
                }
            });
        }); 
        Messages.findOneAndUpdate({ username: req.body.username}, {$pull: { friendrequests: {username: req.query.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request removed', status: 'success' });
                }
            });
        });
    }
    public AcceptFriend(req: express.Request, res: express.Response): void {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        const userId = req.query.userId;
        Messages.findOneAndUpdate({ _id: userId }, {$pull: { friendrequests: {username: req.body.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request removed', status: 'success' });
                }
            });
        });       
        Messages.findOneAndUpdate({ _id: userId }, {$push: { Friends: {username: req.body.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend added', status: 'success' });
                }
            });
        });
        Messages.findOneAndUpdate({ username: req.body.username}, {$pull: { friendrequests: {username: req.query.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend request removed', status: 'success' });
                }
            });
        });
        Messages.findOneAndUpdate({username: req.body.username }, {$push: { Friends: {username: req.query.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend added', status: 'success' });
                }
            });
        });
    }
    public RemoveFriend(req: express.Request, res: express.Response): void {
        //TODO: remove an entry in the friends table and ping Accounts to trigger refreshfriends
        const userId = req.query.userId;
        Messages.findOneAndUpdate({ _id: userId }, {$push: { Friends: {username: req.body.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend removed', status: 'success' });
                }
            });
        });
        Messages.findOneAndUpdate({username: req.body.username }, {$push: { Friends: {username: req.query.username}}}, function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'friend removed', status: 'success' });
                }
            });
        });
    }
    public RefreshFriends(req: express.Request, res: express.Response): void {
        //TODO: return a list of all of a Accounts friends
        Messages.findOne({ username: req.body.username }, "friends",function (err, message) {
            if (err || message == null) {
                return res.sendStatus(500).end();
            }
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success' });
                }
            });
        });   
    }
    public RequestPhotos(req: express.Request, res: express.Response): void {
        //TODO: return photos for the Accounts requested
    }
}