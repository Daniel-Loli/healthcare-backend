// src/middlewares/auth.js
import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  const header = req.headers.authorization;

  if (!header) {
    return res.status(401).json({ error: "No autorizado (sin token)" });
  }

  const token = header.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user_id = decoded.user_id;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido" });
  }
};
