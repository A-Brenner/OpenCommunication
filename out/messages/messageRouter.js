"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var socket_io_1 = __importDefault(require("socket.io"));
var http_1 = require("http");
var express_1 = __importDefault(require("express"));
var AppRouter_1 = require("../common/AppRouter");
var messageController_1 = require("./messageController");
var path_1 = __importDefault(require("path"));
//This is just an example second router to show how additional routers can be added
var MessageRouter = /** @class */ (function (_super) {
    __extends(MessageRouter, _super);
    function MessageRouter() {
        var _this = _super.call(this) || this;
        _this.activeSockets = [];
        _this.app = express_1.default();
        _this.httpServer = http_1.createServer(_this.app);
        _this.io = socket_io_1.default(_this.httpServer);
        _this.configureApp();
        _this.configureRoutes();
        _this.handleSocketConnection();
        return _this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    MessageRouter.prototype.setupRoutes = function () {
    };
    MessageRouter.prototype.configureApp = function () {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
    };
    MessageRouter.prototype.configureRoutes = function () {
        this.app.get("/", function (req, res) {
            res.sendFile("index.html");
        });
    };
    MessageRouter.prototype.handleSocketConnection = function () {
        var _this = this;
        this.io.on("connection", function (socket) {
            var existingSocket = _this.activeSockets.find(function (existingSocket) { return existingSocket === socket.id; });
            if (!existingSocket) {
                _this.activeSockets.push(socket.id);
                socket.emit("update-user-list", {
                    users: _this.activeSockets.filter(function (existingSocket) { return existingSocket !== socket.id; })
                });
                socket.broadcast.emit("update-user-list", {
                    users: [socket.id]
                });
            }
            socket.on("call-user", function (data) {
                socket.to(data.to).emit("call-made", {
                    offer: data.offer,
                    socket: socket.id
                });
            });
            socket.on("make-answer", function (data) {
                socket.to(data.to).emit("answer-made", {
                    socket: socket.id,
                    answer: data.answer
                });
            });
            socket.on("reject-call", function (data) {
                socket.to(data.from).emit("call-rejected", {
                    socket: socket.id
                });
            });
            socket.on("disconnect", function () {
                _this.activeSockets = _this.activeSockets.filter(function (existingSocket) { return existingSocket !== socket.id; });
                socket.broadcast.emit("remove-user", {
                    socketId: socket.id
                });
            });
        });
    };
    MessageRouter.projController = new messageController_1.MessageController();
    return MessageRouter;
}(AppRouter_1.AppRouter));
exports.MessageRouter = MessageRouter;
//# sourceMappingURL=messageRouter.js.map