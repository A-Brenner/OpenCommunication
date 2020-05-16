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
        var roomController = new roomController_1.RoomController();
        this.router.post("/create", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.CreateRoom);
        this.router.post("/sendchat", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.SendRoomChat);
        this.router.get("/refreshchat", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.RefreshRoomChat);
        this.router.post("/joinvoice", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.JoinRoomVoice);
        this.router.get("/refreshvoice", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.RefreshRoomVoice);
        this.router.post("/joinvideo", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.JoinRoomVideo);
        this.router.get("/refreshvideo", [securityMiddleware_1.SecurityMiddleware.RequireAuth], roomController.RefreshRoomVideo);
    };
    return RoomRouter;
}(AppRouter_1.AppRouter));
exports.RoomRouter = RoomRouter;
//# sourceMappingURL=roomRouter.js.map