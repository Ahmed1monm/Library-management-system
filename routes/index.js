import express from "express";

import authRouter  from "./auth.routes.js";
import usersRouter from "./users.routes.js"

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);

export default  router;
