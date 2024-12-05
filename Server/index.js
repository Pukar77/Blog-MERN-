const express = require("express");
const dbconnection = require("./dbconnection/db");
const router = require("./routes/auth-routes");
const homeRoute = require("./routes/home");
const router3 = require("./routes/admin-route");
const guestRouter = require("./routes/normalUser-route");
const deleteroute = require("./routes/deleteblog-route");

require("dotenv").config();

const app = express();

//middleware to use json. We must insert it into begining else our code doesnot work successfully
app.use(express.json());

//database connection
dbconnection();

// routing
app.use("/api/register", router);
app.use("/api/user", router);
app.use("/api/home", homeRoute);
app.use("/api/admin", router3);
app.use("/api/guest", guestRouter);
app.use("/api/deleteblog", deleteroute);

//running the server
app.listen(process.env.PORT, () => {
  console.log(
    `Server is running successfully in post number ${process.env.PORT}`
  );
});
