const express = require("express");
const guest = require("../controller/normalUser-controller");


const guestRouter = express.Router();

guestRouter.get("/welcome", guest);



module.exports = guestRouter;
