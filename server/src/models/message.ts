import pool from "../db";

class Message {
  constructor(public id: number, public userId: number, public message: string, public timestamp: Date) {}

  static async findById(userId: number, id: number) {
    const result = await pool.query(
      `SELECT * FROM messages WHERE user_id = $1 AND id = $2`,
      [userId, id]
    );
    return result.rows[0];
  }

  static async findByUserId(userId: number) {
    const result = await pool.query(
      `SELECT * FROM messages WHERE user_id = $1`,
      [userId]
    );
    return result.rows;
  }

  static async create(userId: number, message: string) {
    const result = await pool.query(
      `INSERT INTO messages (user_id, message, timestamp) VALUES ($1, $2, cast('now' as timestamp)) RETURNING *`,
      [userId, message]
    );
    return result.rows[0];
  }

  static async update(id: number, message: string) {
    const result = await pool.query(
      `UPDATE messages SET message = $1 WHERE id = $2 RETURNING *`,
      [message, id]
    );
    return result.rows[0];
  }

  static async delete(id: number) {
    const result = await pool.query(
      `DELETE FROM messages WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

export default Message;