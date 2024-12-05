const mongoose = require("mongoose");

const dbconnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pukarrimal11:pukarrimal12@cluster0.rbszi.mongodb.net/blog"
    );
    console.log("Database connected successfull");
  } catch (e) {
    console.log("Connection error", e);
  }
};

module.exports = dbconnection;
