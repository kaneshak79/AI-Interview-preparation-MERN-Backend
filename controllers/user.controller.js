import User from "../models/User.js";


// 5) GET ALL USERS (ADMIN ONLY + PAGINATION)
export const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const users = await User.find()
      .select("-password")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 6) UPDATE ROLE (ADMIN ONLY)
export const updateRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "admin"].includes(role)) {
      return res.status(400).json({ msg: "Invalid role" });
    }

    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.role = role;
    await user.save();

    res.json({
      msg: "Role updated",
      user: {
        id: user._id,
        role: user.role
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 7) DELETE USER (ADMIN ONLY + SAFE)
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (user._id.toString() === req.user.id) {
      return res.status(400).json({ msg: "Cannot delete yourself" });
    }

    await user.deleteOne();

    res.json({ msg: "User deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 8) GET USER BY ID (ADMIN OR SAME USER)
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    if (
      req.user.role !== "admin" &&
      req.user.id !== req.params.id
    ) {
      return res.status(403).json({ msg: "Not authorized" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};


// 9) UPDATE PROFILE (LOGGED-IN USER)
export const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    await user.save();

    res.json({
      msg: "Profile updated",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 10) GET PROFILE (LOGGED-IN USER)
export const profile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};