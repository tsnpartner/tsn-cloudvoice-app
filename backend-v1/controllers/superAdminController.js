// controllers/superAdminController.js

const User = require("../models/User");

// POST /api/super-admin/create-user
exports.createUser = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;

    // Validate role is one of the accepted values
    if (!["ADMIN", "MANAGER", "USER"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if email or username already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this email or username already exists" });
    }

    const newUser = new User({
      username,
      email,
      password,
      role,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST /api/super-admin/reset-any-user-password
exports.resetAnyUserPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: "User password reset successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
