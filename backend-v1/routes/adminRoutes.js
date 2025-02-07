// routes/adminRoutes.js
const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const { adminRouteExample } = require("../controllers/adminController");

// Only ADMIN (and SUPER_ADMIN, if you want to allow) can access
router.get(
  "/example",
  isAuthenticated,
  authorizeRoles("ADMIN", "SUPER_ADMIN"),
  adminRouteExample
);

module.exports = router;
