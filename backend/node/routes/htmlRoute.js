const express = require("express");
const htmlRoutes = express.Router();
const { htmlController } = require("../controllers/htmlController");

htmlRoutes.get("/", htmlController);

module.exports = htmlRoutes;
