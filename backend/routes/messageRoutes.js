import express from "express";
import {sendMessage, getMessages, getChatList } from '../controllers/messageController.js';
import { protectRoute } from "../middlewares/protectRoute.js";

const router = express.Router()

router.get("/get/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);
router.get("/chatlist", protectRoute, getChatList);

export default router;