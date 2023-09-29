import express from "express";
import {
  listUsers,
  deleteUser,
  updateUser
} from "../controllers/users.js";
import { getMyBooks } from "../controllers/books.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/").get(auth, listUsers)
router.route("/profile/books").get(auth, getMyBooks)
router.route("/:id")
          .delete(auth, deleteUser)
          .put(auth, updateUser)
  
export default router;
