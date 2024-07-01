import express from "express";
import { Response, Request } from "express";
import Message from "../models/message";
const router = express.Router();

router.get("/message/:userID/:id", async (req: Request, res: Response) => {
    const userId = Number(req.params.userID);
    const messageId = Number(req.params.id);
    const message = await Message.findById(userId, messageId);
    res.json(message);
});

router.get("/messages/:userID", async (req: Request, res: Response) => {
    const userId = Number(req.params.userID);
    const messages = await Message.findByUserId(userId);
    res.json(messages);
});

router.post("/message", async (req: Request, res: Response) => {
    const newMessage = await Message.create(req.body.user_id, req.body.message);
    res.json(newMessage);
});

router.put("/message/:id", async (req: Request, res: Response) => {
    const updatedMessage = await Message.update(Number(req.params.id), req.body.message);
    res.json(updatedMessage);
});

router.delete("/message/:id", async (req: Request, res: Response) => {
    const deletedMessage = await Message.delete(Number(req.params.id));
    res.json(deletedMessage);
});

export default router;
