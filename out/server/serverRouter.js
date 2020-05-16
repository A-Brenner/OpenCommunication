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
var serverController_1 = require("./serverController");
//This is just an example second router to show how additional routers can be added
var serverRouter = /** @class */ (function (_super) {
    __extends(serverRouter, _super);
    function serverRouter() {
        return _super.call(this) || this;
    }
    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    serverRouter.prototype.setupRoutes = function () {
        this.router.post("/create", [securityMiddleware_1.SecurityMiddleware.RequireAuth], serverRouter.ServerController.CreateServer);
        this.router.post("/join", [securityMiddleware_1.SecurityMiddleware.RequireAuth], serverRouter.ServerController.JoinServer);
        this.router.delete("/leave", [securityMiddleware_1.SecurityMiddleware.RequireAuth], serverRouter.ServerController.LeaveServer);
        this.router.get("/refresh", [securityMiddleware_1.SecurityMiddleware.RequireAuth], serverRouter.ServerController.RefreshServer);
    };
    serverRouter.ServerController = new serverController_1.ServerController();
    return serverRouter;
}(AppRouter_1.AppRouter));
exports.serverRouter = serverRouter;
//# sourceMappingURL=serverRouter.js.map