import express from "express";
import { Response, Request } from "express";
import { Message } from "../models/message";
import { Conversations } from "../models/conversations";
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

// Create or return an existing conversation between two users
router.post("/conversation/create", async (req: Request, res: Response) => {
  const { userId, recipientId } = req.body;

  try {
    let conversation = await Conversations.findOne({
      where: {
        [Op.or]: [
          { user1Id: userId, user2Id: recipientId },
          { user1Id: recipientId, user2Id: userId }
        ]
      }
    });

    if (!conversation) {
      conversation = await Conversations.create({
        user1Id: userId,
        user2Id: recipientId
      });
    }

    res.status(200).json({ conversationId: conversation.id });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/message", async (req: Request, res: Response) => {
  try {
    const { senderId, recipientId, message } = req.body;

    // Check if a conversation already exists between these users
    let conversation = await Conversations.findOne({
      where: {
        [Op.or]: [
          { user1Id: senderId, user2Id: recipientId },
          { user1Id: recipientId, user2Id: senderId },
        ],
      },
    });

    // If no conversation exists, create a new one
    if (!conversation) {
      conversation = await Conversations.create({
        user1Id: senderId,
        user2Id: recipientId,
      });
    }

    // Create the new message with the conversationId
    const newMessage = await Message.create({
      senderId,
      recipientId,
      message,
      conversationId: conversation.id,
      timestamp: new Date(),
    });

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
