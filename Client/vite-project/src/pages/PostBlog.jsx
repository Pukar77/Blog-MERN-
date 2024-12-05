import React, { useEffect, useState } from "react";
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
    <div className="flex">
      {/* <form onSubmit={postBlog}>
        <input
          className="border-pink-500"
          type="text"
          name="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        Enter your text here
        <input
          className="border-pink-500"
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        Enter your title here
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />{" "}
        Choose your Photo thumbnail
        <button type="submit">Submit your blog</button>
      </form> */}
      <div>
        <Aside />
      </div>
      <Texteditor />
    </div>
  );
}

export default PostBlog;
