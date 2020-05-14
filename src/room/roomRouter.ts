import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { RoomController } from "./roomController";

//This is just an example second router to show how additional routers can be added
export class RoomRouter extends AppRouter{
    
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        const roomController: RoomController=new RoomController();
        this.router.post("/room/create", [SecurityMiddleware.RequireAuth],roomController.CreateRoom);
        this.router.post("/room/sendchat", [SecurityMiddleware.RequireAuth],roomController.SendRoomChat);
        this.router.get("/room/refreshchat", [SecurityMiddleware.RequireAuth],roomController.RefreshRoomChat);
        this.router.post("/room/joinvoice", [SecurityMiddleware.RequireAuth],roomController.JoinRoomVoice);
        this.router.get("/room/refreshvoice", [SecurityMiddleware.RequireAuth],roomController.RefreshRoomVoice);
        this.router.post("/room/joinvideo", [SecurityMiddleware.RequireAuth],roomController.JoinRoomVideo);
        this.router.get("/room/refreshvideo", [SecurityMiddleware.RequireAuth],roomController.RefreshRoomVideo);
    }    
}