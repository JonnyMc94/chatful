import { Server, Socket } from "socket.io";
import Message from "../models/message"; // Import the Message model

const chatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    console.log("a user connected");

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });

    // Handle new message event
    socket.on("newMessage", async (data) => {
      try {
        const { userId, message } = data;
        const newMessage = await Message.createMessage(userId, message);
        io.emit("newMessage", newMessage);
      } catch (error) {
        console.error("Error creating message:", error);
      }
    });

    // Handle update message event
    socket.on("updateMessage", async (data) => {
      try {
        const { id, message } = data;
        const updatedMessage = await Message.updateMessage(id, message);
        io.emit("updateMessage", updatedMessage);
      } catch (error) {
        console.error("Error updating message:", error);
      }
    });

    // Handle delete message event
    socket.on("deleteMessage", async (data) => {
      try {
        const { id } = data;
        const deletedMessage = await Message.deleteMessage(id);
        io.emit("deleteMessage", deletedMessage);
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    });
  });
};

export default chatSocket;