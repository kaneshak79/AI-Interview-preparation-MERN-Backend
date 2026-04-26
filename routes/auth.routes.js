import express from "express";
import {
  register,
  login,
  profile,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, profile);

// NEW
router.post("/forgot-password", forgotPassword);
router.put("/reset-password/:token", resetPassword);
// router.put("/profile/update", protect, updateProfile);

router.post("/logout", (req, res) => {
  res.json({ msg: "Logged out" });
});

export default router;