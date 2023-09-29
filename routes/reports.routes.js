import express from "express";

import { overdueBooks,
         lastMonthBorrowings, 
         borrowingProcessReport } from "../controllers/reports.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.route("/")
        .get(auth, borrowingProcessReport)
router.route("/overdue-books")
        .get(auth, overdueBooks)
router.route("/last-month")
        .get(auth, lastMonthBorrowings)
        
export default router;
