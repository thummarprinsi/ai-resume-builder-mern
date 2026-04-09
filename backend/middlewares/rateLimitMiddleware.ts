import rateLimit from "express-rate-limit";

export const aiLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minute
  max: 10, // max 10 requests
  message: {
    success: false,
    message: "Too many requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});