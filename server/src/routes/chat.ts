import express from "express";
import { Response, Request } from "express";
import { Message } from "../models/message";
const router = express.Router();

router.get("/message/:userID/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);
  const messageId = Number(req.params.id);

  try {
    const message = await Message.findOne({ where: { userId, id: messageId } });
    res.json(message);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/messages/:userID", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);

  try {
    const messages = await Message.findAll({ where: { userId } });
    res.json(messages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/message", async (req: Request, res: Response) => {
  try {
    console.log("Received message request:", req.body); // Add logging
    const { senderId, recipientId, message } = req.body; // Use 'message' as the field name
    const newMessage = await Message.create({ senderId, recipientId, message, date: new Date() });
    console.log("New message created:", newMessage); // Add logging
    const io = req.app.get("socketio");
    io.emit("newMessage", newMessage);
    res.json(newMessage);
  } catch (err: any) {
    console.error("Error saving message:", err); // Add logging
    res.status(500).json({ message: err.message });
  }
});

router.put("/message/:id", async (req: Request, res: Response) => {
  try {
    const [updatedCount, updatedMessages] = await Message.update(
      { message: req.body.message }, // Use 'message' as the field name
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