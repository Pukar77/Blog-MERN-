import React, { useState } from "react";
import { Aside } from "./Aside";
import Texteditor from "./Texteditor";

function PostBlog() {
  const getToken = () => {
    return localStorage.getItem("accesstoken");
  };

  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");

  const postBlog = async (e) => {
    e.preventDefault();
    const token = getToken();
    console.log(token);
    const formData = new FormData();
    formData.append("text", text);
    formData.append("title", title);
    formData.append("image", image);

    let response = await fetch("http://localhost:8000/api/home/upload", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    let data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex gap-16 p-8">
      <Aside />
      <div className="w-full max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">
          Create a New Blog
        </h1>
        <form onSubmit={postBlog}>
          {/* Title Input */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Blog Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border-black border rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your blog title"
              required
            />
          </div>

          {/* Image Upload */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Blog Thumbnail
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full border-black border rounded-lg p-3 focus:outline-none focus:ring focus:ring-blue-300"
              required
            />
          </div>

          {/* Text Editor */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              Blog Content
            </label>
            <div
              className="border-black border rounded-lg"
              style={{ minHeight: "300px" }}
            >
              <Texteditor setText={setText} />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-3 rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Your Blog
          </button>
        </form>
      </div>
    </div>
  );
}

export default PostBlog;
