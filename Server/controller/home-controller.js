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

const like = async (req, res) => {
  const id = req.params.id; // Blog post ID
  const userid = req.body.userid; // User ID from request body

  try {
    // Fetch the blog post by ID
    const blog = await fileSchema.findById(id);
    console.log(blog);

    if (!blog) {
      return res.json({
        status: false,
        message: "No blog available",
      });
    } else {
      if (blog.likeby.includes(userid)) {
        return res.json({
          status: false,
          message: "Already liked😎",
        });
      } else {
        blog.likeby.push(userid);
        blog.like += 1;
        await blog.save();
      }
    }
  } catch (err) {
    console.error("Error handling like/unlike:", err);
    return res.status(500).json({
      status: "Failed",
      message: "Error handling like/unlike request.",
    });
  }
};

module.exports = { uploadFile, getindblog, like };
