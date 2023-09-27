import express from "express";
import {
  getUserTypes,
} from "../controllers/users.js";
import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.get("/", auth, getUserTypes);

export default router;
