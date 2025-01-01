import React, { useState } from "react";
import Texteditor from "./Texteditor";

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
    <div className="p-8 max-w-3xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Create a New Blog</h1>
      <form onSubmit={postBlog}>
        {/* Title Input */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            placeholder="Enter your blog title"
            required
          />
        </div>

        {/* Text Editor */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Content</label>
          <Texteditor setText={setText} />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Blog Thumbnail</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Submit Blog
        </button>
      </form>
    </div>
  );
}

export default PostBlog;
