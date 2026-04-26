import express from "express";
import {
  getUsers,
  updateRole,
  deleteUser,
  getUserById,
  updateProfile,
  profile
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/profile", protect, profile);

// USER ROUTES (put FIRST)
router.put("/profile/update", protect, updateProfile);

// ADMIN ROUTES
router.get("/", protect, adminOnly, getUsers);
router.put("/:id/role", protect, adminOnly, updateRole);
router.delete("/:id", protect, adminOnly, deleteUser);

// GET USER (SMART ACCESS)
router.get("/:id", protect, getUserById);

export default router;