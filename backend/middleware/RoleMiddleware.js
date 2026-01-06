/**
 * Role-based authorization middleware
 * Usage:
 *  - authorizeRoles('admin', 'moderator')  // allow specific roles
 *  - authorizeMinRole('moderator')          // allow roles with minimum privilege (moderator and admin)
 */

const roleHierarchy = {
  user: 1,
  moderator: 2,
  admin: 3,
};

const authorizeRoles = (...allowedRoles) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  const userRole = req.user.role;

  if (!allowedRoles.includes(userRole)) {
    return res.status(403).json({ error: "Forbidden: insufficient permissions." });
  }

  next();
};

const authorizeMinRole = (minRole) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized access." });
  }

  if (!roleHierarchy[minRole]) {
    return res.status(500).json({ error: "Invalid role configuration." });
  }

  const userLevel = roleHierarchy[req.user.role] || 0;
  const minLevel = roleHierarchy[minRole];

  if (userLevel < minLevel) {
    return res.status(403).json({ error: "Forbidden: insufficient permissions." });
  }

  next();
};

module.exports = { authorizeRoles, authorizeMinRole };
