import express from "express";
import { Response, Request } from "express";
import { Message } from "../models/message";
import { Op } from "sequelize";

const router = express.Router();

console.log('Initializing Message model');

// Get the latest message for each active conversation
router.get("/messages/:userID", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);

  try {
    const conversations = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId },
          { recipientId: userId },
        ],
      },
      order: [["timestamp", "DESC"]],
    });

    const activeConversations = conversations.reduce((acc: any, message: any) => {
      const otherUserId = message.senderId === userId ? message.recipientId : message.senderId;
      if (!acc[otherUserId]) {
        acc[otherUserId] = message;
      }
      return acc;
    }, {});

    res.json(Object.values(activeConversations));
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

// Get all messages for a specific conversation
router.get("/conversation/:userID/:otherUserID", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);
  const otherUserId = Number(req.params.otherUserID);

  try {
    const messages = await Message.findAll({
      where: {
        [Op.or]: [
          { senderId: userId, recipientId: otherUserId },
          { senderId: otherUserId, recipientId: userId },
        ],
      },
      order: [["timestamp", "ASC"]],
    });

    res.json(messages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

// Create a new message
router.post("/message", async (req: Request, res: Response) => {
  try {
    console.log("Received message request:", req.body);
    const { senderId, recipientId, message } = req.body;
    const newMessage = await Message.create({ senderId, recipientId, message, timestamp: new Date() });
    console.log("New message created:", newMessage);
    const io = req.app.get("socketio");
    io.emit("newMessage", newMessage);
    res.json(newMessage);
  } catch (err: any) {
    console.error("Error saving message:", err);
    res.status(500).json({ message: err.message });
  }
});

// Update a selected message
router.put("/message/:id", async (req: Request, res: Response) => {
  try {
    const [updatedCount, updatedMessages] = await Message.update(
      { message: req.body.message },
      { where: { id: Number(req.params.id) }, returning: true }
    );
    const updatedMessage = updatedMessages[0];
    const io = req.app.get("socketio");
    io.emit("updateMessage", updatedMessage);
    res.json(updatedMessage);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a message
router.delete("/message/:id", async (req: Request, res: Response) => {
  try {
    const deletedMessage = await Message.destroy({ where: { id: Number(req.params.id) } });
    const io = req.app.get("socketio");
    io.emit("deleteMessage", { id: Number(req.params.id) });
    res.json({ id: Number(req.params.id) });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
