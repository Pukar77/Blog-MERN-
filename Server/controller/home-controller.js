const express = require("express");
const mongoose = require("mongoose");
const fileSchema = require("../modules/uploadFile-modle");
const uploadToCloudinary = require("../helper/cloudinary-helper");

const uploadFile = async (req, res) => {
  try {
    const { text, title } = req.body;

    const { url, publicId } = await uploadToCloudinary(req.file.path);

    const insertIntoDatabase = await fileSchema.create({
      text,
      url,
      title,
      publicId,
      uploadedBy: req.userInfo.userid,
    });
    if (insertIntoDatabase) {
      return res.status(200).json({
        status: "Success",
        message: "Successfully inserted into database",
      });
    }
  } catch (e) {
    return res.status(400).json({
      status: "Not success",
      message: "Some error occured",
    });
  }
};

const getindblog = async (req, res) => {
  try {
    // let blogs = fileSchema.find
    const getuserid = req.userInfo.userid;
    console.log(getuserid);
    const getallblog = await fileSchema.find({ uploadedBy: getuserid });

    if (!getallblog) {
      return res.json({ message: "You haven't uploaded any blog" });
    }

    return res.json({ message: getallblog });
  } catch (e) {}
};

module.exports = { uploadFile, getindblog };
