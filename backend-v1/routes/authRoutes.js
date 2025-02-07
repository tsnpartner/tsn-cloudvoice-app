// routes/authRoutes.js
const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");

// POST /api/auth/login
router.post("/login", login);

// POST /api/auth/logout
router.post("/logout", logout);

// POST /api/auth/forgot-password
router.post("/forgot-password", forgotPassword);

// POST /api/auth/reset-password/:token
router.post("/reset-password/:token", resetPassword);

module.exports = router;
