// routes/managerRoutes.js
const express = require("express");
const router = express.Router();
const {
  isAuthenticated,
  authorizeRoles,
} = require("../middlewares/authMiddleware");
const { managerRouteExample } = require("../controllers/managerController");

// Only MANAGER (and SUPER_ADMIN, or ADMIN, if you want) can access
router.get(
  "/example",
  isAuthenticated,
  authorizeRoles("MANAGER", "ADMIN", "SUPER_ADMIN"),
  managerRouteExample
);

module.exports = router;
