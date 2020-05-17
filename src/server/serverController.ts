
import express from "express";
import Server from './serverModel';
import mongoose = require("mongoose");
import Room from "../room/roomModel";

export class ServerController {
    public CreateServer(req: express.Request, res: express.Response): void {
        //TODO: create a entry in the server table
        var newServer = new Server({ Name: req.body.Name , Users: {username: req.body.username}});
        var generalroom = new Room({server: newServer._id, name: "General", type: "Chat"});
        newServer.Rooms.push(generalroom._id);
        newServer.save((err, server) => {
            if(err){
                res.send(err);
            }    
            else{
                generalroom.save((err,room) => {
                    if(err){
                        res.send(err);
                    }    
                    else{
                        res.send({ fn: 'Created Server', status: 'success' })
                    }
                });
            }
        });
    }
    public JoinServer(req: express.Request, res: express.Response): void {
        //TODO: add a user to a server
        const serverId = req.body.serverId;
        Server.findOneAndUpdate({ _id: serverId }, {$push:{ Users: {username: req.body.username}}}, function (err, server) {
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
        const serverId = req.body.serverId;
        Server.findOneAndUpdate({ _id: serverId }, {$pull:{ Users: {username :req.body.username}}}, function (err, server) {
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
    public RefreshUsers(req: express.Request, res: express.Response): void {
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
                    return res.send({ fn: 'Friends List retrieved', status: 'success', server});
                }
            });
        });
    }
    public RefreshRooms(req: express.Request, res: express.Response): void {
        //TODO: return a list of all users and rooms in a server
        Server.findOne({ Name: req.body.Name }, "Rooms",function (err, server) {
            if (err || server == null) {
                return res.sendStatus(500).end();
            }
            server.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'Friends List retrieved', status: 'success', server});
                }
            });
        });
    }
    public ListServers(req: express.Request, res: express.Response): void {
        Server.find({ Users : req.body.userid},function(err, servers){
            if (err || servers == null) {
                return res.sendStatus(500).end();
            }
            else{
                return res.send(JSON.stringify(servers));
            }
        });
    }
}