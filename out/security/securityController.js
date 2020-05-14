"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt_1 = __importDefault(require("bcrypt"));
var config_1 = require("../config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var userModel_1 = __importDefault(require("./userModel"));
//Implementation of security endpoints
var SecurityController = /** @class */ (function () {
    function SecurityController() {
    }
    //login - POST
    //expects username and password fields to be set in the body of the post request
    //sends a token to the caller on success, 401 on failure
    SecurityController.prototype.login = function (req, res, next) {
        userModel_1.default.findOne({ username: req.body.username }, function (err, user) {
            if (err || user == null) {
                return res.sendStatus(401).end();
            }
            if (!user.validatePassword(req.body.password))
                return res.sendStatus(401).end();
            var token = jsonwebtoken_1.default.sign({ username: user.toObject().username, password: user.toObject().password }, config_1.Config.secret, { expiresIn: config_1.Config.tokenLife });
            return res.send({ fn: 'login', status: 'success', data: { token: token, user: { username: req.body.username } } }).end();
        });
    };
    //register - POST
    //expects username and password fields to be set in the body of the post request
    //sends a success message to caller on success, or a failure status code on failure
    SecurityController.prototype.register = function (req, res, next) {
        var encryptedPassword = encryptString(req.body.password);
        userModel_1.default.findOne({ username: req.body.username }, function (err, userDoc) {
            if (err)
                res.sendStatus(500).end();
            if (userDoc)
                return res.status(400).send({ fn: 'register', status: 'failure', data: 'User Exists' }).end();
            if (encryptedPassword === "*") {
                return res.status(400).send({ fn: 'register', status: 'failure', data: 'Invalid Password' }).end();
            }
            var user = new userModel_1.default({ username: req.body.username, password: encryptedPassword });
            user.save(function (err) {
                if (err) {
                    return res.sendStatus(500).end();
                }
                else {
                    return res.send({ fn: 'register', status: 'success' });
                }
            });
        });
    };
    //authorize - GET
    //this code actually does nothing, but if it is secured at the route level, it will return the username for the token that
    //was returned.  This is used to verify a token by a client application
    //returns the users username on success
    SecurityController.prototype.authorize = function (req, res, next) {
        //validate that req.authUser exists, if so, return the user's username.
        console.log(req.body.authUser.username);
        res.send({ fn: 'authorize', status: 'success', data: { username: req.body.authUser.username } }).end();
    };
    //changePwd - POST
    //chages the password of the user represented in the token.  Expects password in the body of the POST
    //returns a success messager to the client on success, a failure status code on failure
    SecurityController.prototype.changePwd = function (req, res, next) {
        if (!req.body.password)
            res.status(400).send({ fn: 'changePwd', status: 'failure' }).end();
        var encryptedPassword = encryptString(req.body.password);
        userModel_1.default.findOneAndUpdate({ username: req.body.username }, { password: encryptedPassword }, function (err, user) {
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
    };
    return SecurityController;
}());
exports.SecurityController = SecurityController;
function encryptString(password) {
    try {
        var salt = bcrypt_1.default.genSaltSync(10);
        return bcrypt_1.default.hashSync(password, salt);
    }
    catch (err) {
        return "*";
    }
}
exports.encryptString = encryptString;
//# sourceMappingURL=securityController.js.map