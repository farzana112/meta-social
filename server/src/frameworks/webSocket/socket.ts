import { Server } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";


let activeUsers: any[] = [];
let onlineUsers : any[]= [];

const addNewUser = (username:string, socketId:string) => {
  !onlineUsers.some((user) => user.username === username) &&
    onlineUsers.push({ username, socketId });
    console.log(onlineUsers,"::::::::!!!");
    
};

const removeUser = (socketId:string) => {
  onlineUsers = onlineUsers.filter((user) => user.socketId !== socketId);
};

const getUser = (username:string) => {
  return onlineUsers.find((user) => user.username === username);
};



const socketConfig = (
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>
) => {
    console.log("socket")
  io.on("connection", (socket) => { 
    console.log(`user connected ${socket.id}`);
    socket.on("new-user-add", (newUserId) => {
      console.log("new user added!!")
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        
      }
      // send all active users to new user
      console.log(activeUsers)
      io.emit("get-users", activeUsers);
      
    });
    socket.on("newUser", (user) => {
      
      addNewUser(user?.userName, socket.id);
    });


    socket.on("sendNotification", (data) => {
   
      const { receiverId } = data;
      console.log(receiverId)
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      if (user) {
        
        io.to(user.socketId).emit("getNotifications", data);
      }
      
    
    });

    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });

    // send message to a specific user
    socket.on("send-message", (data) => {
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to:", receiverId);
      console.log("Data:", data);
      if (user) {
        io.to(user.socketId).emit("receive-message", data);
      }
    });
  });
};

export default socketConfig;


