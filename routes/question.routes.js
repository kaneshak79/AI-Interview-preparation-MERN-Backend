import express from "express";
import {
  createQuestion,
  getQuestions,
  getOne,
  update,
  remove
} from "../controllers/question.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

// CREATE
router.post("/", protect, adminOnly, createQuestion);

// GET ALL + FILTER + SEARCH + PAGINATION
router.get("/", protect, getQuestions);

// GET SINGLE
router.get("/:id", protect, getOne);

// UPDATE
router.put("/:id", protect, adminOnly, update);

// DELETE
router.delete("/:id", protect, adminOnly, remove);

export default router;