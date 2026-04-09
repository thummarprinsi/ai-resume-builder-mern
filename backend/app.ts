import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./routes/authRoutes.js";
import resumeRouter from "./routes/resumeRoutes.js";
import helmet from "helmet";

const app = express();

// middlewares
app.use(helmet());


app.use(
  cors({
    origin: process.env.FRONTEND_URI,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
// routes
app.use("/api/auth",router);
app.use("/api/resume",resumeRouter);


export default app;