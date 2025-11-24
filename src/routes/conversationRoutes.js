// src/routes/conversationRoutes.js
import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  getConversations,
  createConversation,
  getMessages,
  updateConversationTitle
} from "../controllers/conversationController.js";

const router = express.Router();

router.get("/", auth, getConversations);
router.post("/", auth, createConversation);
router.get("/:id/messages", auth, getMessages);
router.put("/:id/title", auth, updateConversationTitle);

export default router;
