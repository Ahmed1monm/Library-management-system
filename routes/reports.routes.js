import express from "express";

import { overdueBooks } from "../controllers/reports.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/overdue-books")
        .get(auth, overdueBooks)
        
export default router;
