
import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { MessageController } from "./messageController";

//This is just an example second router to show how additional routers can be added
export class MessageRouter extends AppRouter {
    static MessageController: MessageController = new MessageController();


    constructor() { 
      super(); 
    } 

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {
      this.router.post("/acceptFriend", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.AcceptFriend);
      this.router.post("/addFriend", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.AddFriend);
      this.router.delete("/declineFriend", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.DeclineFriend);
      this.router.delete("/removeFriend", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.RemoveFriend);
      this.router.get("/friendRefresh", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.RefreshFriends);
      this.router.get("/chatRefresh", [SecurityMiddleware.RequireAuth],MessageRouter.MessageController.RefreshFriendChat);
    }
}