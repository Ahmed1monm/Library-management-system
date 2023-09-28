import express from "express";
import {
  login,
  register,
} from "../controllers/auth.js";

import {loginValidator, registerValidator} from "../validators/auth.validator.js"
const router = express.Router();

router.route("/register").post( registerValidator, register);
router.route("/login").post(loginValidator, login);


export default router;
