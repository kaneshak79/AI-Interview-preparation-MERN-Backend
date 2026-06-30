import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.middleware.js";
import rateLimiter from "./middleware/rateLimiter.js";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import questionRoutes from "./routes/question.routes.js";
import interviewRoutes from "./routes/interview.routes.js";
import responseRoutes from "./routes/response.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
import mediaRoutes from "./routes/media.routes.js";
import fileUpload from "express-fileupload";
import paymentRoutes from "./routes/payment.routes.js";
import aiRoutes from "./routes/aiRoutes.js";

connectDB();

const app = express();
app.set("trust proxy", 1);

app.use(express.json());
app.use(cors());
app.use(rateLimiter);

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "./tmp/"
}));

app.get("/api/health", (req, res) => res.send("API Running"));

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/interviews", interviewRoutes);
app.use("/api/responses", responseRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/ai", aiRoutes);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

import socketHandler from "./sockets/interview.socket.js";
socketHandler(io);

server.listen(5000);