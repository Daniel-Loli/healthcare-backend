// src/routes/chatRoutes.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import { ask, startConversation } from "../controllers/chatController.js";

const router = express.Router();

//iniciar conversación
router.post("/start", auth, startConversation);

//pregunta
router.post("/ask", auth, ask);

export default router;
