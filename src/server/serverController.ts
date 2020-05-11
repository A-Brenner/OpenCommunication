import express from "express";
import Server from './serverModel';
import mongoose = require("mongoose");

export class ServerController {
    public CreateServer(req: express.Request, res: express.Response): void {
        //TODO: create a entry in the server table
        let newServer = new Server(req.body);
        newServer.save((err, server) => {
            if(err){
                res.send(err);
            }    
            res.json(server);
        });
    }
    public JoinServer(req: express.Request, res: express.Response): void {
        //TODO: add a user to a server
        const serverId = req.query.serverId;
        Server.findOneAndUpdate({ _id: serverId }, {$push:{ Users: req.body.username}}, function (err, server) {
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
    public LeaveServer(req: express.Request, res: express.Response): void {
        //TODO: remove a user to a server
        const serverId = req.query.serverId;
        Server.findOneAndUpdate({ _id: serverId }, {$pull:{ Users: req.body.username}}, function (err, server) {
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
    }
    public RefreshServer(req: express.Request, res: express.Response): void {
        //TODO: return a list of all users and rooms in a server
        Server.findOne({ Name: req.body.Name }, "Users",function (err, server) {
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
    }
}