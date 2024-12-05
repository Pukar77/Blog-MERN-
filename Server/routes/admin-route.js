const express = require("express");

const authMiddleware = require("../middleware/auth-middleware");
const checkAdmin = require("../middleware/admin-middleware");

const router3 = express.Router();

router3.get("/adminpage", authMiddleware, checkAdmin, (req, res) => {
  return res.json({
    status: "Success",
    message: "This is admin page",
  });
});

module.exports = router3;
