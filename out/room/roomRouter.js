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
Object.defineProperty(exports, "__esModule", { value: true });
var AppRouter_1 = require("../common/AppRouter");
var securityMiddleware_1 = require("../security/securityMiddleware");
var roomController_1 = require("./roomController");
//This is just an example second router to show how additional routers can be added
var RoomRouter = /** @class */ (function (_super) {
    __extends(RoomRouter, _super);
    function RoomRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    RoomRouter.prototype.setupRoutes = function () {
        this.router.post("/room/create", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.CreateRoom);
        this.router.post("/room/sendchat", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.SendRoomChat);
        this.router.get("/room/refreshchat", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.RefreshRoomChat);
        this.router.post("/room/joinvoice", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.JoinRoomVoice);
        this.router.get("/room/refreshvoice", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.RefreshRoomVoice);
        this.router.post("/room/joinvideo", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.JoinRoomVideo);
        this.router.get("/room/refreshvideo", [securityMiddleware_1.SecurityMiddleware.RequireAuth], RoomRouter.roomController.RefreshRoomVideo);
    };
    RoomRouter.roomController = new roomController_1.RoomController();
    return RoomRouter;
}(AppRouter_1.AppRouter));
exports.RoomRouter = RoomRouter;
//# sourceMappingURL=roomRouter.js.map