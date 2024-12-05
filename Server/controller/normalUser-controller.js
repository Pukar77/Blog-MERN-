const express = require("express");
const postedBlog = require("../modules/uploadFile-modle");
const users = require("../modules/usermodule.js");

const guest = async (req, res) => {
  try {
    // Fetch all blogs
    const fetchBlog = await postedBlog.find({});
    console.log(fetchBlog);

    // If no blogs found
    if (!fetchBlog) {
      return res.status(400).json({
        status: "Failed",
        message: "Unable to fetch blogs",
      });
    }

    // Get user details for each uploadedBy ID
    const blogWithUserDetails = await Promise.all(
      fetchBlog.map(async (blog) => {
        const user = await users.findById(blog.uploadedBy); // Query the user model
        return {
          ...blog._doc, // Include blog details
          uploadedBy: user ? user.username : "Unknown User", // Include username
        };
      })
    );

    console.log("Blog with user details:", blogWithUserDetails);

    // Return the response
    return res.status(200).json({
      status: "Fetched success for guest",
      allBlogs: blogWithUserDetails,
    });
  } catch (e) {
    console.log("Error", e);
    return res.status(500).json({
      status: "Failed",
      message: "An error occurred",
    });
  }
};

module.exports = guest;
