import express from "express";

import { overdueBooks,
         lastMonthBorrowings, 
         borrowingProcessReport } from "../controllers/reports.js";
import { auth } from "../middlewares/auth.js";
import { rateLimiterMiddleware } from "../middlewares/ratelimiter.js";
import { CSVReportValidator, paginationValidator } from "../validators/reports.validators.js";

const router = express.Router();
// list all borrowing process in by sending start date and end date
// response contains CSV file contains the data
router.route("/")
        .get(auth, rateLimiterMiddleware, CSVReportValidator, borrowingProcessReport)
// reporting overdue borrowing 
router.route("/overdue-books")
        .get(auth, rateLimiterMiddleware, paginationValidator ,overdueBooks)

// reporting borrowing processes last month
router.route("/last-month")
        .get(auth, rateLimiterMiddleware, lastMonthBorrowings)
        
export default router;
