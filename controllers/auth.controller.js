import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import generateToken from "../utils/generateToken.js";


// 1) REGISTER
// export const register = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ msg: "All fields required" });

//   const exists = await User.findOne({ email });
//   if (exists) return res.status(400).json({ msg: "User already exists" });

//   const hashed = await bcrypt.hash(password, 10);

//   const user = await User.create({ name, email, password: hashed });

//   res.json({
//     token: generateToken(user),
//     user
//   });
// };

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ msg: "All fields required" });

  const exists = await User.findOne({ email });
  if (exists) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);

  // 🔥 CHECK IF FIRST USER
  const isFirstUser = (await User.countDocuments()) === 0;

  const user = await User.create({
    name,
    email,
    password: hashed,
    role: isFirstUser ? "admin" : "user"
  });

  res.json({
    token: generateToken(user),
    user
  });
};

// 2) LOGIN
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Wrong password" });

  res.json({
    token: generateToken(user),
    user
  });
};


// 3) PROFILE
export const profile = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  res.json(user);
};


// 4) FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) return res.status(400).json({ msg: "User not found" });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpire = Date.now() + 10 * 60 * 1000;

  await user.save();

  // Normally send email (skipped for FREE version)
  res.json({ resetToken: token });
};


// 5) RESET PASSWORD
export const resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.params.token,
    resetTokenExpire: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ msg: "Invalid or expired token" });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;

  await user.save();

  res.json({ msg: "Password updated" });
};

// // 6) UPDATE PROFILE
// export const updateProfile = async (req, res) => {
//   try {
//     const { name, email } = req.body;

//     // ✅ find current user
//     const user = await User.findById(req.user.id);
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     // ✅ check if email already exists (if changed)
//     if (email && email !== user.email) {
//       const exists = await User.findOne({ email });
//       if (exists) {
//         return res.status(400).json({ msg: "Email already in use" });
//       }
//     }

//     // ✅ update fields
//     user.name = name || user.name;
//     user.email = email || user.email;

//     await user.save();

//     // ✅ return updated user (without password)
//     const updatedUser = await User.findById(user._id).select("-password");

//     res.json({
//       msg: "Profile updated successfully",
//       user: updatedUser
//     });

//   } catch (err) {
//     res.status(500).json({ msg: "Server error" });
//   }
// };