const express = require("express");
const authmiddleware = require("../middleware/auth-middleware");
const {
  uploadFile,
  getindblog,
  like,
} = require("../controller/home-controller");
const uploadMiddleware = require("../middleware/upload-middleware");
const readblog = require("../controller/readblog-controller");
const homeRoute = express.Router();

homeRoute.get("/welcome", authmiddleware, (req, res) => {
  return res.json({
    status: "Home page",
    message: "Welcome to home page",
    user: req.userInfo,
  });
});

homeRoute.post(
  "/upload",
  authmiddleware,
  uploadMiddleware.single("image"),
  uploadFile
);

homeRoute.get("/getindividualblog", authmiddleware, getindblog);
homeRoute.get("/readblog/:id", authmiddleware, readblog);
homeRoute.post("/like/:id", authmiddleware, like);

module.exports = homeRoute;
