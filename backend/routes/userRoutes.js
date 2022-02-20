const express = require("express");
const userRoutes = express.Router();

const {
  getMe,
  loginUser,
  deleteUser,
  getAllUsers,
  activateUser,
  registerUser,
  deactivateUser,
  getActiveUsers,
  forgotPassword,
  getDeletedUsers,
  getInactiveUsers,
  updateUserPassword,
} = require("../controllers/userController");
const { protectHandler } = require("../middleware/authMiddleware");

userRoutes.get("/", protectHandler, getMe);
userRoutes.get("/all", protectHandler, getAllUsers);
userRoutes.get("/deleted", protectHandler, getDeletedUsers);
userRoutes.get("/active", protectHandler, getActiveUsers);
userRoutes.get("/inactive", protectHandler, getInactiveUsers);
userRoutes.get("/forgotpassword", forgotPassword);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);

userRoutes.delete("/delete/:id", protectHandler, deleteUser);

userRoutes.put("/activate/:id", protectHandler, activateUser);
userRoutes.put("/deactivate/:id", protectHandler, deactivateUser);
userRoutes.put("/password/reset/:id", protectHandler, updateUserPassword);

module.exports = userRoutes;
