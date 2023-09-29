import express from "express";

import { overdueBooks,
         lastMonthBorrowings, 
         borrowingProcessReport } from "../controllers/reports.js";
import { auth } from "../middlewares/auth.js";
import { rateLimiterMiddleware } from "../middlewares/ratelimiter.js";

const router = express.Router();

router.route("/")
        .get(auth, rateLimiterMiddleware, borrowingProcessReport)
router.route("/overdue-books")
        .get(auth, rateLimiterMiddleware ,overdueBooks)
router.route("/last-month")
        .get(auth, rateLimiterMiddleware, lastMonthBorrowings)
        
export default router;
