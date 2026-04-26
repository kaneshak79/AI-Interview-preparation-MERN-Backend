import express from "express";
import {
  submitAnswers,
  getByInterview,
  getAll
} from "../controllers/response.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

// Submit + Evaluate Answer
router.post("/", protect, submitAnswers);

// Get responses of an interview (user only)
router.get("/interview/:id", protect, getByInterview);

// Admin - all responses
router.get("/", protect, adminOnly, getAll);

export default router;