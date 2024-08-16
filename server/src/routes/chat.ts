import express from "express";
import { Response, Request } from "express";
import Message from "../models/message";
const router = express.Router();

router.get("/message/:userID/:id", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);
  const messageId = Number(req.params.id);

  try {
    const message = await Message.findById(userId, messageId);
    res.json(message);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.get("/messages/:userID", async (req: Request, res: Response) => {
  const userId = Number(req.params.userID);

  try {
    const messages = await Message.findByUserId(userId);
    res.json(messages);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.post("/message", async (req: Request, res: Response) => {
  try {
    const newMessage = await Message.create(req.body.user_id, req.body.message);
    const io = req.app.get("socketio");
    io.emit("newMessage", newMessage);
    res.json(newMessage);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.put("/message/:id", async (req: Request, res: Response) => {
  try {
    const updatedMessage = await Message.update(
      Number(req.params.id),
      req.body.message
    );
    const io = req.app.get("socketio");
    io.emit("updateMessage", updatedMessage);
    res.json(updatedMessage);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

router.delete("/message/:id", async (req: Request, res: Response) => {
  try {
    const deletedMessage = await Message.delete(Number(req.params.id));
    const io = req.app.get("socketio");
    io.emit("deleteMessage", deletedMessage);
    res.json(deletedMessage);
  } catch (err: any) {
    res.status(404).json({ message: err.message });
  }
});

export default router;