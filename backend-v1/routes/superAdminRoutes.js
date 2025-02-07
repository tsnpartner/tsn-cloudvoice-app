// routes/superAdminRoutes.js
const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const {
  createUser,
  resetAnyUserPassword,
} = require("../controllers/superAdminController");

// All these routes require SUPER_ADMIN role
router.use(isAuthenticated, authorizeRoles("SUPER_ADMIN"));

// POST /api/super-admin/create-user
router.post("/create-user", createUser);

// POST /api/super-admin/reset-user-password
router.post("/reset-user-password", resetAnyUserPassword);

module.exports = router;
