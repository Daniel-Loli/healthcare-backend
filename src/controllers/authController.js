// src/controllers/authController.js
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getPool } from "../services/db.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ error: "Faltan campos" });
    }

    const pool = await getPool();

    const existing = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM users WHERE email = @email");

    if (existing.recordset.length > 0) {
      return res.status(400).json({ error: "Email ya registrado" });
    }

    const hash = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("name", name)
      .input("email", email)
      .input("password_hash", hash)
      .query(
        "INSERT INTO users (name, email, password_hash) VALUES (@name, @email, @password_hash)"
      );

    res.json({ message: "Usuario registrado correctamente" });
  } catch (err) {
    console.error("Error en register:", err);
    res.status(500).json({ error: "Error interno" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const pool = await getPool();

    const result = await pool
      .request()
      .input("email", email)
      .query("SELECT * FROM users WHERE email = @email");

    if (result.recordset.length === 0) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const user = result.recordset[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) {
      return res.status(400).json({ error: "Credenciales inválidas" });
    }

    const token = jwt.sign(
      { user_id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token ,
      name: user.name 
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error interno" });
  }
};
