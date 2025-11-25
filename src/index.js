// src/index.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import conversationRoutes from "./routes/conversationRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// health check
app.get("/", (req, res) => {
  res.json({ message: "HealthCare Backend OK" });
});

// Rutas
app.use("/auth", authRoutes);
app.use("/conversations", conversationRoutes);
app.use("/chat", chatRoutes);

export default app;
