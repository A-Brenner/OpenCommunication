import express from 'express';
import bcrypt from 'bcrypt';
import { Config } from '../config';
import jwt from 'jsonwebtoken';
import User from './userModel';
import mongoose = require("mongoose")


//Implementation of security endpoints

export class SecurityController {
    //login - POST
    //expects username and password fields to be set in the body of the post request
    //sends a token to the caller on success, 401 on failure
    public login(req: express.Request, res: express.Response, next: express.NextFunction) {
        User.findOne({ username: req.body.username }, function (err, user) {
            if (err || user == null) {
                return res.sendStatus(401).end();
            }
            if (!user.validatePassword(req.body.password)) return res.sendStatus(401).end();
            const token = jwt.sign({username:user.toObject().username,password:user.toObject().password}, Config.secret, { expiresIn: Config.tokenLife });
            return res.send({ fn: 'login', status: 'success', data: { token: token, user: { username: req.body.username } } }).end();
        }
        );
    }

    //register - POST
    //expects username and password fields to be set in the body of the post request
    //sends a success message to caller on success, or a failure status code on failure
    public register(req: express.Request, res: express.Response, next: express.NextFunction) {
        var encryptedPassword = encryptString(req.body.password);
        User.findOne({ username: req.body.username }, function (err, userDoc) {
            if (err) res.sendStatus(500).end();
            if (userDoc) return res.status(400).send({ fn: 'register', status: 'failure', data: 'User Exists' }).end();
            if(encryptedPassword === "*"){
                return res.status(400).send({ fn: 'register', status: 'failure', data: 'Invalid Password' }).end();
            }
            var user = new User({ username: req.body.username , password: encryptedPassword });
            user.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'register', status: 'success' });
                }
            });
        })
    }
    //authorize - GET
    //this code actually does nothing, but if it is secured at the route level, it will return the username for the token that
    //was returned.  This is used to verify a token by a client application
    //returns the users username on success
    public authorize(req: express.Request, res: express.Response, next: express.NextFunction) {
        //validate that req.authUser exists, if so, return the user's username.
        console.log(req.body.authUser.username);
        res.send({ fn: 'authorize', status: 'success', data: { username: req.body.authUser.username } }).end();
    }
    //changePwd - POST
    //chages the password of the user represented in the token.  Expects password in the body of the POST
    //returns a success messager to the client on success, a failure status code on failure
    public changePwd(req: express.Request, res: express.Response, next: express.NextFunction) {
        if (!req.body.password) res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        var encryptedPassword = encryptString(req.body.password);
        User.findOneAndUpdate({ username: req.body.username }, { password: encryptedPassword }, function (err, user) {
            if (err || user == null) {
                return res.sendStatus(500).end();
            }
            user.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'password change', status: 'success' });
                }
            });
        });
    }
}
    export function encryptString(password:string):string{
            try {
                var salt : string  = bcrypt.genSaltSync(10);
                return bcrypt.hashSync(password, salt);
            }catch (err){
                return "*";
            }
    }
