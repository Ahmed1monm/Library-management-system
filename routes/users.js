import express from "express";
import {
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  createUser,
} from "../controllers/users.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.get("/", auth, getAllUsers);
router.post("/", auth, createUser);
router.put("/:id", auth, updateUser);
router.get("/:id", auth, getUser);
router.delete("/:id", auth, deleteUser);

export default router;
