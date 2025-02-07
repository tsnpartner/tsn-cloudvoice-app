// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const { userRouteExample } = require("../controllers/userController");

// Only USER role (and above if needed) can access
router.get(
  "/example",
  isAuthenticated,
  authorizeRoles("USER", "MANAGER", "ADMIN", "SUPER_ADMIN"),
  userRouteExample
);

module.exports = router;
