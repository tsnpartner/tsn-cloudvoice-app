// middlewares/authMiddleware.js
module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }
    return res.status(401).json({ message: "Unauthorized" });
  },

  authorizeRoles: (...roles) => {
    return (req, res, next) => {
      if (!req.session || !req.session.userRole) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      if (!roles.includes(req.session.userRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      next();
    };
  },
};
