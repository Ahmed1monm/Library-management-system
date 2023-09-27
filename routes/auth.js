import express from "express";
import {
  getUsers,
  login,
  register,
  verify,
  getMe,
  updateMe,
  updatePassword,
} from "../controllers/auth.js";

import { auth } from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/verify", verify);
router.get("/", getUsers);
router.get("/me", auth, getMe);
router.put("/me", auth, updateMe);
router.put("/password", auth, updatePassword);

export default router;
