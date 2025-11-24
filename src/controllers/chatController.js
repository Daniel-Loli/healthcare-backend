// src/controllers/chatController.js
import { getPool } from "../services/db.js";
import { askRag } from "../services/fastapiClient.js";

// Crear conversación
export const startConversation = async (req, res) => {
  try {
    const { title } = req.body;

    const pool = await getPool();

    const result = await pool
      .request()
      .input("user_id", req.user_id)
      .input("title", title || "Nueva consulta")
      .query(`
        INSERT INTO conversations (user_id, title)
        OUTPUT INSERTED.id
        VALUES (@user_id, @title)
      `);

    const conversationId = result.recordset[0].id;

    return res.json({
      conversation_id: conversationId,
      message: "Conversación creada correctamente",
    });
  } catch (err) {
    console.error("Error en startConversation:", err);
    return res.status(500).json({ error: "Error interno" });
  }
};



// 🔹 Enviar pregunta + generar respuesta IA + renombrar conversación si es primer mensaje
export const ask = async (req, res) => {
  try {
    const { conversation_id, question } = req.body;

    const pool = await getPool();

    // ========================
    // 1) INSERTAR MENSAJE USER
    // ========================
    await pool
      .request()
      .input("conversation_id", conversation_id)
      .input("sender", "user")
      .input("content", question)
      .query(`
        INSERT INTO messages (conversation_id, sender, content)
        VALUES (@conversation_id, @sender, @content)
      `);

    // ==============================================================
    // 2) SI ES EL PRIMER MENSAJE → USARLO COMO NOMBRE DE CONVERSACIÓN
    // ==============================================================
    const countResult = await pool
      .request()
      .input("conversation_id", conversation_id)
      .query(`
        SELECT COUNT(*) AS total
        FROM messages
        WHERE conversation_id = @conversation_id
      `);

    const totalMessages = countResult.recordset[0].total;

    if (totalMessages === 1) {
      const autoTitle = question.substring(0, 50);

      await pool
        .request()
        .input("conversation_id", conversation_id)
        .input("user_id", req.user_id)
        .input("title", autoTitle)
        .query(`
          UPDATE conversations
          SET title = @title, updated_at = GETDATE()
          WHERE id = @conversation_id AND user_id = @user_id
        `);
    }

    // ===================
    // 3) OBTENER HISTORIAL
    // ===================
    const historyResult = await pool
      .request()
      .input("conversation_id", conversation_id)
      .query(`
        SELECT sender, content
        FROM messages
        WHERE conversation_id = @conversation_id
        ORDER BY created_at
      `);

    const formattedHistory = historyResult.recordset.map((m) => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.content,
    }));

    // ============================
    // 4) CONSULTAR RAG ENGINE IA
    // ============================
    const ragResponse = await askRag(question, formattedHistory);

    // =================================
    // 5) GUARDAR RESPUESTA DE LA IA
    // =================================
    await pool
      .request()
      .input("conversation_id", conversation_id)
      .input("sender", "assistant")
      .input("content", ragResponse.answer)
      .query(`
        INSERT INTO messages (conversation_id, sender, content)
        VALUES (@conversation_id, @sender, @content)
      `);

    return res.json(ragResponse);
  } catch (err) {
    console.error("Error en ask:", err.message);
    res.status(500).json({ error: "Error interno" });
  }
};
