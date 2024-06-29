import express from "express";
import { Response, Request } from "express";
import pool from "../db";
const router = express.Router();

let message: string = "";
let messages: Array<string> = [];

router.get("/", (req, res) => {
  res.send("Chat home page");
});

//Get a users message by ID
router.get("/message/:userID/:id", (req: Request, res: Response) => {
  res.json(message);
});

//Get all messages for a user
router.get("/messages/:userID", async (req: Request, res: Response) => {
  try {
    const allMessages = await pool.query(
      `SELECT * FROM messages WHERE user_id = $1`,
      [req.params.userID]
    );
    messages = allMessages.rows;
    res.json(messages);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server error");
  }
});

//Post a new message
router.post("/message", async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { user_id, message } = req.body;
    const newMessage = await pool.query(
      `INSERT INTO messages (user_id, message, timestamp) VALUES ($1, $2, cast('now' as timestamp));`,
      [user_id, message]
    );
    res.json(newMessage.rows);
    console.log(newMessage.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//Edits a message
router.put("/message/:id", async (req: Request, res: Response) => {
  // Handle a new message
  try {
    const { message } = req.body;
    const updatedMessage = await pool.query(
      `UPDATE messages SET message = $1 WHERE id = $2`,
      [message, req.params.id]
    );
    res.json(updatedMessage.rows);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

//Deletes a message
router.delete("/message/:id", (req: Request, res: Response) => {
  try {
    const deletedMessage = pool.query(`DELETE FROM messages WHERE id = $1`, [
      req.params.id,
    ]);
    res.json(deletedMessage);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
