import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { RoomController } from "./roomController";

//This is just an example second router to show how additional routers can be added
export class RoomRouter extends AppRouter{
    
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        const roomController: RoomController=new RoomController();
        this.router.post("/create", roomController.CreateRoom);
        this.router.post("/sendchat", roomController.SendRoomChat);
        this.router.get("/refreshchat", roomController.RefreshRoomChat);
        this.router.post("/joinvoice", [SecurityMiddleware.RequireAuth],roomController.JoinRoomVoice);
        this.router.get("/refreshvoice", [SecurityMiddleware.RequireAuth],roomController.RefreshRoomVoice);
        this.router.post("/joinvideo", [SecurityMiddleware.RequireAuth],roomController.JoinRoomVideo);
        this.router.get("/refreshvideo", [SecurityMiddleware.RequireAuth],roomController.RefreshRoomVideo);
    }    
}