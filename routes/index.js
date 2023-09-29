import express from "express";

import authRouter  from "./auth.routes.js";
import usersRouter from "./users.routes.js";
import booksRouter from "./books.routes.js";
import reportsRouter from "./reports.routes.js";

const router = express.Router();

router.use("/auth", authRouter);
router.use("/users", usersRouter);
router.use("/books", booksRouter);
router.use("/reports", reportsRouter);

export default  router;
