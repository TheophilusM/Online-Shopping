const express = require("express");
const supportRoutes = express.Router();
// const { protectHandler } = require("../middleware/authMiddleware");
const { supportContact } = require("../controllers/supportController");

supportRoutes.post("/", supportContact);

module.exports = supportRoutes;
