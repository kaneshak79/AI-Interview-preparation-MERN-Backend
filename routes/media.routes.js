import express from "express";
import { uploadFile } from "../controllers/media.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/upload", protect, uploadFile);

export default router;