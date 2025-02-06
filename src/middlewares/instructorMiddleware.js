const instructorMiddleware = (req, res, next) => {
    if (req.user.role !== "instructor") {
      return res.status(403).json({ error: "Access denied. Instructors only." });
    }
    next();
  };
  
  module.exports = instructorMiddleware;
  