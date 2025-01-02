import React, { useState } from "react";
import Texteditor from "./Texteditor";
import { Aside } from "./Aside";

function PostBlog() {
  const [text, setText] = useState(""); // Text from the editor
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);

  const postBlog = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("text", text); // Quill editor content
    formData.append("title", title); // Title
    formData.append("image", image); // Uploaded image

    try {
      const response = await fetch("http://localhost:8000/api/home/upload", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accesstoken")}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        alert("Blog posted successfully!");
      } else {
        console.error(result.message);
        alert("Failed to post blog: " + result.message);
      }
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex h-screen">
      {/* Aside Section */}
      <div
        className="w-1/4 p-4 text-white"
        style={{ backgroundColor: "#FF9D23" }} // Custom color for Aside
      >
        <Aside />
      </div>

      {/* Blog Form Section */}
      <div
        className="w-3/4 p-8 overflow-y-auto"
        style={{ backgroundColor: "#f2f2f2" }}
      >
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Create a New Blog
        </h1>
        <form onSubmit={postBlog}>
          {/* Title Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Text Editor */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Blog Content
            </label>
            <Texteditor setText={setText} />
          </div>

          {/* Image Upload */}
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">
              Blog Thumbnail
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition"
          >
            Submit Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostBlog;
