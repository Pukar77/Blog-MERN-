const express = require("express");
const deleteBlog = require("../controller/deleteblog-controller");
const authMiddleware = require("../middleware/auth-middleware");
const router = express.Router();

router.delete("/delete/:id", authMiddleware, deleteBlog);
module.exports = router;
