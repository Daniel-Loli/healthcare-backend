// src/controllers/conversationController.js
import { getPool } from "../services/db.js";

export const getConversations = async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool
      .request()
      .input("user_id", req.user_id)
      .query(
        "SELECT * FROM conversations WHERE user_id = @user_id ORDER BY updated_at DESC"
      );

    res.json(result.recordset);
  } catch (err) {
    console.error("Error en getConversations:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const createConversation = async (req, res) => {
  try {
    const { title } = req.body;
    const pool = await getPool();

    await pool
      .request()
      .input("user_id", req.user_id)
      .input("title", title || "Nueva conversación")
      .query(
        "INSERT INTO conversations (user_id, title) VALUES (@user_id, @title)"
      );

    res.json({ message: "Conversación creada" });
  } catch (err) {
    console.error("Error en createConversation:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
export const updateConversationTitle = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;

    if (!title) {
      return res.status(400).json({ error: "El título no puede estar vacío" });
    }

    const pool = await getPool();

    await pool
      .request()
      .input("id", id)
      .input("user_id", req.user_id)
      .input("title", title)
      .query(`
        UPDATE conversations 
        SET title = @title, updated_at = GETDATE()
        WHERE id = @id AND user_id = @user_id
      `);

    res.json({ message: "Título actualizado correctamente" });
  } catch (err) {
    console.error("Error en updateConversationTitle:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const pool = await getPool();

    const result = await pool
      .request()
      .input("conversation_id", id)
      .query(
        "SELECT * FROM messages WHERE conversation_id = @conversation_id ORDER BY created_at"
      );

    res.json(result.recordset);
  } catch (err) {
    console.error("Error en getMessages:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
