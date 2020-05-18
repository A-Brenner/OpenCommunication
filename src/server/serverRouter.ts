import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { ServerController } from "./serverController";

//This is just an example second router to show how additional routers can be added
export class serverRouter extends AppRouter{
    
    constructor(){super();}

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {      
        const serverController: ServerController= new ServerController();
        this.router.post("/create",[SecurityMiddleware.RequireAuth],serverController.CreateServer);
        this.router.post("/join", [SecurityMiddleware.RequireAuth],serverController.JoinServer);
        this.router.delete("/leave",[SecurityMiddleware.RequireAuth], serverController.LeaveServer);
        this.router.get("/refreshusers",[SecurityMiddleware.RequireAuth],serverController.RefreshUsers);
        this.router.get("/refreshrooms",[SecurityMiddleware.RequireAuth],serverController.RefreshRooms);
        this.router.get("/list",[SecurityMiddleware.RequireAuth],serverController.ListServers);
    }    
}