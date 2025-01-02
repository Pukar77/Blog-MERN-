const express = require("express");
const { edituser } = require("../controller/home-controller");
const authMiddleware = require("../middleware/auth-middleware");

const editroute = express.Router();

editroute.put("/update/:id", authMiddleware, edituser);

module.exports = editroute;
