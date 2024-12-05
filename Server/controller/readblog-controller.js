const express = require("express");
const user = require("../modules/uploadFile-modle");

const readblog = async (req, res) => {
  try {
    const id = req.params.id;
    const blog = await user.findById(id);

    if (blog) {
      return res.status(200).json({
        status: true,
        message: "Successfully found the blog of the clicked id",
        blogs: blog,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Blog of such id doesnot exist",
      });
    }
  } catch (e) {
    console.log("Error occured", e);
  }
};

module.exports = readblog;
