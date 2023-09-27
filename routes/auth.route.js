import express from "express";
import {
  login,
  register,
} from "../controllers/auth.js";

import {loginValidator, registerValidator} from "../validators/auth.validator.js"
const router = express.Router();

router.post("/register", registerValidator, register);
router.post("/login",loginValidator, login);


export default router;
