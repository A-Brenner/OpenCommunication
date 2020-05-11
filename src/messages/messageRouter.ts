
import socketIO, { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import express, { Application } from "express";
import { AppRouter } from "../common/AppRouter";
import { SecurityMiddleware } from "../security/securityMiddleware";
import { MessageController } from "./messageController";
import path from "path";

//This is just an example second router to show how additional routers can be added
export class MessageRouter extends AppRouter {
    static projController: MessageController = new MessageController();
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;

    private activeSockets: string[] = [];

    constructor() { 
      super(); 
      this.app = express();
      this.httpServer = createServer(this.app);
      this.io = socketIO(this.httpServer);
      this.configureApp();
      this.configureRoutes();
      this.handleSocketConnection();
    } 

    //sets up the routes within this module shows an example of a route that requires authorization, and one that does not
    setupRoutes(): void {

    }

    private configureApp(): void {
      this.app.use(express.static(path.join(__dirname, "../public")));
    }

    private configureRoutes(): void {
      this.app.get("/", (req, res) => {
        res.sendFile("index.html");
      });
    }

    handleSocketConnection(): void {        
        this.io.on("connection", socket => {
            const existingSocket = this.activeSockets.find(
              existingSocket => existingSocket === socket.id
            );
      
            if (!existingSocket) {
              this.activeSockets.push(socket.id);
      
              socket.emit("update-user-list", {
                users: this.activeSockets.filter(
                  existingSocket => existingSocket !== socket.id
                )
              });
      
              socket.broadcast.emit("update-user-list", {
                users: [socket.id]
              });
            }
      
            socket.on("call-user", (data: any) => {
              socket.to(data.to).emit("call-made", {
                offer: data.offer,
                socket: socket.id
              });
            });
      
            socket.on("make-answer", data => {
              socket.to(data.to).emit("answer-made", {
                socket: socket.id,
                answer: data.answer
              });
            });
      
            socket.on("reject-call", data => {
              socket.to(data.from).emit("call-rejected", {
                socket: socket.id
              });
            });
      
            socket.on("disconnect", () => {
              this.activeSockets = this.activeSockets.filter(
                existingSocket => existingSocket !== socket.id
              );
              socket.broadcast.emit("remove-user", {
                socketId: socket.id
              });
            });
        });
    }
}