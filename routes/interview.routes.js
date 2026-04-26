import express from "express";
import {
  start,
  getById,
  getAll,
  complete,
  cancel,
} from "../controllers/interview.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

// 15) Start interview
router.post("/start", protect, start);

// 16) Get interview by ID
router.get("/:id", protect, getById);

// 17) Get all interviews
router.get("/", protect, getAll);

// 19) Complete interview
router.put("/:id/complete", protect, complete);

// 20) Cancel interview
router.put("/:id/cancel", protect, cancel);

// router.post("/submit",protect,submitAnswers);


export default router;