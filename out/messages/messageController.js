"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var messageModel_1 = __importDefault(require("./messageModel"));
var MessageController = /** @class */ (function () {
    function MessageController() {
    }
    MessageController.prototype.SendFriendChat = function (req, res) {
        //TODO: add a message to the PersonalMessage table and ping Accounts to trigger refreshfriendchat
        var userId = req.query.userId;
        messageModel_1.default.findOne({ _id: userId }, function (err, messageDoc) {
            if (err || messageDoc == null) {
                return res.sendStatus(500).end();
            }
            var message = new messageModel_1.default({ time: Date.now, content: req.body.content });
            message.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'message sent', status: 'success' });
                }
            });
        });
    };
    MessageController.prototype.RefreshFriendChat = function (req, res) {
        //TODO: return list of of every message after the last one.
        messageModel_1.default.findOne({ friends: { username: req.body.username } }, "messages", function (err, message) {
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
    };
    MessageController.prototype.AddFriend = function (req, res) {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        var userId = req.query.userId;
        messageModel_1.default.findOneAndUpdate({ _id: userId }, { $push: { friendrequests: { username: req.body.username } } }, function (err, message) {
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
        messageModel_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { friendrequests: { username: req.query.username } } }, function (err, message) {
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
    };
    MessageController.prototype.DeclineFriend = function (req, res) {
        var userId = req.query.userId;
        messageModel_1.default.findOneAndUpdate({ _id: userId }, { $pull: { friendrequests: { username: req.body.username } } }, function (err, user) {
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
        messageModel_1.default.findOneAndUpdate({ username: req.body.username }, { $pull: { friendrequests: { username: req.query.username } } }, function (err, message) {
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
    };
    MessageController.prototype.AcceptFriend = function (req, res) {
        //TODO: add an entry in the friends table and ping Accounts to trigger refreshfriends
        var userId = req.query.userId;
        messageModel_1.default.findOneAndUpdate({ _id: userId }, { $pull: { friendrequests: { username: req.body.username } } }, function (err, message) {
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
        messageModel_1.default.findOneAndUpdate({ _id: userId }, { $push: { friends: { username: req.body.username } } }, function (err, message) {
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
        messageModel_1.default.findOneAndUpdate({ username: req.body.username }, { $pull: { friendrequests: { username: req.query.username } } }, function (err, message) {
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
        messageModel_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { friends: { username: req.query.username } } }, function (err, message) {
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
    };
    MessageController.prototype.RemoveFriend = function (req, res) {
        //TODO: remove an entry in the friends table and ping Accounts to trigger refreshfriends
        var userId = req.query.userId;
        messageModel_1.default.findOneAndUpdate({ _id: userId }, { $push: { friends: { username: req.body.username } } }, function (err, message) {
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
        messageModel_1.default.findOneAndUpdate({ username: req.body.username }, { $push: { friends: { username: req.query.username } } }, function (err, message) {
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
    };
    MessageController.prototype.RefreshFriends = function (req, res) {
        //TODO: return a list of all of a Accounts friends
        messageModel_1.default.findOne({ username: req.query.username }, "friends", function (err, message) {
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
    };
    MessageController.prototype.RequestPhotos = function (req, res) {
        //TODO: return photos for the Accounts requested
    };
    return MessageController;
}());
exports.MessageController = MessageController;
//# sourceMappingURL=messageController.js.map