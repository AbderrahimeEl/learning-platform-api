const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const adminMiddleware = require("../middlewares/adminMiddleware");
const authMiddleware = require("../middlewares/authMiddleware");

router.get(
  "/",
  authMiddleware.authenticateUser,
  adminMiddleware,
  userController.getAllUsers
);
router.get(
  "/:id",
  authMiddleware.authenticateUser,
  adminMiddleware,
  userController.getUserById
);
router.put(
  "/:id",
  authMiddleware.authenticateUser,
  adminMiddleware,
  userController.updateUser
);
router.delete(
  "/:id",
  authMiddleware.authenticateUser,
  adminMiddleware,
  userController.deleteUser
);

module.exports = router;
