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
    const conversations = await Conversations.findAll({
      where: {
        [Op.or]: [{ user1Id: userId }, { user2Id: userId }],
      },
      include: [{
        model: Message,
        as: 'messages',
        order: [["timestamp", "DESC"]],
        limit: 1,
      }],
    });

    const activeConversations = conversations.map((conversation: any) => {
      const lastMessage = conversation.messages[0];
      return {
        id: conversation.id,
        user1Id: conversation.user1Id,
        user2Id: conversation.user2Id,
        lastMessage: lastMessage ? lastMessage.message : '',
        timestamp: lastMessage ? lastMessage.timestamp : null,
        createdAt: conversation.createdAt, // Include createdAt
        updatedAt: conversation.updatedAt, // Include updatedAt
        messages: conversation.messages,
      };
    });

    res.json(activeConversations);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

// Get all messages for a specific conversation
router.get("/conversation/:conversationId", async (req: Request, res: Response) => {
  const conversationId = Number(req.params.conversationId);

  try {
    const messages = await Message.findAll({
      where: {
        conversationId: conversationId,
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

    res.status(200).json(conversation);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/message", async (req: Request, res: Response) => {
  try {
    const { senderId, recipientId, message, conversationId } = req.body;
    console.log(req.body)

    // Check if a conversation already exists between these users
    let conversation = await Conversations.findOne({
      where: {
        id: conversationId,
      },
    });

    console.log(conversation)

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

    console.log(newMessage)

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