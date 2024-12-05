const express = require("express");
const user = require("../modules/uploadFile-modle");

const deleteBlog = async (req, res) => {
  const id = req.params.id;
  const find = await user.findByIdAndDelete(id);
  console.log("Blog deleted");

  if (find) {
    return res.status(200).json({
      status: true,
      message: "Successfully deleted blog",
    });
  } else {
    return res.status(400).json({
      status: false,
      message: "Some problem occured while deleting the blog",
    });
  }
};

module.exports = deleteBlog;
