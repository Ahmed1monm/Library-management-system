import { RateLimiterMemory } from "rate-limiter-flexible";

import { redisClient } from "../config/redis.js";
import {RATE_LIMITER} from "../config/constants.js"

const rateLimiter = new RateLimiterMemory({
  storeClient: redisClient,
  points: RATE_LIMITER.RATE_LIMITER_POINTS,
  duration: 1,
  blockDuration: RATE_LIMITER.RATE_LIMITER_BLOCK_DURATION,
});

/**
 * @description - Middleware to limit the number of requests
 * @param  {Object} req - Express request object
 * @param  {Object} res - Express response object
 * @param  {Function} next - Express next middleware
 */
export const rateLimiterMiddleware = (req, res, next) => {
  rateLimiter
    .consume(req.ip)
    .then(rateLimiterRes => {
      res.set({
        "Retry-After": rateLimiterRes.msBeforeNext / 1000,
        "X-RateLimit-Limit": 10,
        "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
        "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext)
      });
      next();
    })
    .catch(rateLimiterRes => {
      res.set({
        "Retry-After": rateLimiterRes.msBeforeNext / 1000,
        "X-RateLimit-Limit": 10,
        "X-RateLimit-Remaining": rateLimiterRes.remainingPoints,
        "X-RateLimit-Reset": new Date(Date.now() + rateLimiterRes.msBeforeNext)
      });
      next(boom.tooManyRequests());
    });
};