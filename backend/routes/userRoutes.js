import express from 'express';
import { allUsers } from '../controllers/userController.js';

import { protectRoute } from "../middlewares/protectRoute.js";
const router = express.Router();


router.get('/', protectRoute, allUsers);

export default router;