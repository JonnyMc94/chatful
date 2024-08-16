import { Server, Socket } from "socket.io";

const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // Handle new message event
    socket.on("newMessage", (message) => {
      io.emit("newMessage", message);
    });

    // Handle update message event
    socket.on("updateMessage", (message) => {
      io.emit("updateMessage", message);
    });

    // Handle delete message event
    socket.on("deleteMessage", (message) => {
      io.emit("deleteMessage", message);
    });
  });
};

export default chatSocket;