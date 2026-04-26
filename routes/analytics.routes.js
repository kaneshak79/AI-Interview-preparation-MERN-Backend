import express from "express";
import {
  overall,
  categoryWise,
  weakTopics,
  progress,
  latestScore
} from "../controllers/analytics.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// 26) Overall performance
router.get("/overall", protect, overall);

// 27) Category-wise
router.get("/category", protect, categoryWise);

// 28) Weak topics
router.get("/weak-topics", protect, weakTopics);

// 29) Progress over time
router.get("/progress", protect, progress);

// 30) Latest interview score
router.get("/latest", protect, latestScore);

export default router;