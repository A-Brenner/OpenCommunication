"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var serverModel_1 = __importDefault(require("./serverModel"));
var ServerController = /** @class */ (function () {
    function ServerController() {
    }
    ServerController.prototype.CreateServer = function (req, res) {
        //TODO: create a entry in the server table
        var newServer = new serverModel_1.default(req.body);
        newServer.save(function (err, server) {
            if (err) {
                res.send(err);
            }
            res.json(server);
        });
    };
    ServerController.prototype.JoinServer = function (req, res) {
        //TODO: add a user to a server
        var serverId = req.query.serverId;
        serverModel_1.default.findOneAndUpdate({ _id: serverId }, { $push: { Users: req.body.username } }, function (err, server) {
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
    };
    ServerController.prototype.LeaveServer = function (req, res) {
        //TODO: remove a user to a server
        var serverId = req.query.serverId;
        serverModel_1.default.findOneAndUpdate({ _id: serverId }, { $pull: { Users: req.body.username } }, function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Left Server', status: 'success' });
                }
            });
        });
    };
    ServerController.prototype.RefreshServer = function (req, res) {
        //TODO: return a list of all users and rooms in a server
        serverModel_1.default.findOne({ Name: req.body.Name }, "Users", function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success' });
                }
            });
        });
    };
    return ServerController;
}());
exports.ServerController = ServerController;
//# sourceMappingURL=serverController.js.map