const express = require("express");
const user = require("../modules/usermodule");
let bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    //check if username already exist, because we are not allowing two users with same username
    const checkUserName = await user.findOne({ username });
    //if username already exist
    if (checkUserName) {
      return res.status(400).json({
        status: "False",
        message: "Username is already taken, please choose another username",
      });
    }

    //hashing the password to store in the database
    let salt = await bcrypt.genSalt(10);
    let hashPassword = await bcrypt.hash(password, salt);

    //inserting data into database
    const insertUser = await user.create({
      username,
      email,
      password: hashPassword,
    });

    if (insertUser) {
      return res.status(200).json({
        status: "Success",
        message: "New user has been registerd",
      });
    } else {
      return res.status(200).json({
        status: "Failed",
        message: "Some error occured while registering new user",
      });
    }
  } catch (e) {
    console.log("Some error occured in auth-conotroller", e);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const checkUser = await user.findOne({ username });

    if (!checkUser) {
      return res.status(400).json({
        status: false,
        message: "Invalid username",
      });
    }

    const checkPassword = await bcrypt.compareSync(
      password,
      checkUser.password
    );

    if (!checkPassword) {
      return res.status(400).json({
        status: false,
        message: "Invalid password",
      });
    }

    //storing the user detail in web token
    const token = jwt.sign(
      {
        userid: checkUser._id,
        Username: checkUser.username,
        role: checkUser.role,
        email: checkUser.email,
      },
      process.env.JWT_SECRETE_KEY,
      {
        expiresIn: "7d",
      }
    );

    return res.status(200).json({
      status: true,
      message: "Login Successfull",
      token,
    });
  } catch (e) {
    return res.json({
      message: "Some error occured",
    });
  }
};

module.exports = { signup, login };
