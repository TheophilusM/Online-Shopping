const express = require("express");
const userRoutes = express.Router();

const {
  getMe,
  loginUser,
  deleteUser,
  verifyEmail,
  verifyPhone,
  getAllUsers,
  activateUser,
  registerUser,
  userLastScene,
  deactivateUser,
  getActiveUsers,
  forgotPassword,
  getDeletedUsers,
  getInactiveUsers,
  updateUserPassword,
  updateUserPasswordLink,
} = require("../controllers/userController");
const { protectHandler } = require("../middleware/authMiddleware");

userRoutes.get("/", protectHandler, getMe);
userRoutes.get("/all", protectHandler, getAllUsers);
userRoutes.get("/deleted", protectHandler, getDeletedUsers);
userRoutes.get("/active", protectHandler, getActiveUsers);
userRoutes.get("/inactive", protectHandler, getInactiveUsers);
userRoutes.get("/forgotpassword", forgotPassword);
userRoutes.get("/verify/phone", verifyPhone);
userRoutes.get("/verify/email", verifyEmail);

userRoutes.post("/login", loginUser);
userRoutes.post("/register", registerUser);

userRoutes.delete("/delete/:id", protectHandler, deleteUser);

userRoutes.patch("/activate/:id", protectHandler, activateUser);
userRoutes.patch("/deactivate/:id", protectHandler, deactivateUser);
userRoutes.patch("/password/reset/:id", protectHandler, updateUserPassword);
userRoutes.patch("/password/link-reset", updateUserPasswordLink);
userRoutes.patch("/lastscene/:id", protectHandler, userLastScene);

module.exports = userRoutes;
