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
<<<<<<< HEAD
  updateUserPasswordLink,
=======
>>>>>>> 7b71d15be9e855dd696586395206473a44a585c1
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

<<<<<<< HEAD
userRoutes.patch("/activate/:id", protectHandler, activateUser);
userRoutes.patch("/deactivate/:id", protectHandler, deactivateUser);
userRoutes.patch("/password/reset/:id", protectHandler, updateUserPassword);
userRoutes.patch("/password/link-reset", updateUserPasswordLink);
=======
userRoutes.put("/activate/:id", protectHandler, activateUser);
userRoutes.put("/deactivate/:id", protectHandler, deactivateUser);
userRoutes.put("/password/reset/:id", protectHandler, updateUserPassword);
>>>>>>> 7b71d15be9e855dd696586395206473a44a585c1

module.exports = userRoutes;
