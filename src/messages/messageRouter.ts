
import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { MessageController } from "./messageController";

//This is just an example second router to show how additional routers can be added
export class MessageRouter extends AppRouter {


    constructor() { 
      super(); 
    } 

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {
      const messageController: MessageController = new MessageController();
      this.router.post("/acceptFriend",messageController.AcceptFriend);
      this.router.post("/addFriend",messageController.AddFriend);
      this.router.delete("/declineFriend", [SecurityMiddleware.RequireAuth],messageController.DeclineFriend);
      this.router.delete("/removeFriend", [SecurityMiddleware.RequireAuth],messageController.RemoveFriend);
      this.router.get("/friendRefresh", [SecurityMiddleware.RequireAuth],messageController.RefreshFriends);
      this.router.get("/chatRefresh", [SecurityMiddleware.RequireAuth],messageController.RefreshFriendChat);
    }
}