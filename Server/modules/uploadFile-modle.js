const mongoose = require("mongoose");

const fileSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  like: {
    type: Number, // Array of user IDs who liked the post
    default: 0,
  },
  likeby: [{ type: mongoose.Schema.Types.ObjectId, ref: "BlogLogin" }],
  view: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["draft", "published"],
    default: "draft",
  },
  publicId: {
    type: String,
    // required: true,
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogLogin",
    required: true,
  },
});

module.exports = mongoose.model("postedBlog", fileSchema);
