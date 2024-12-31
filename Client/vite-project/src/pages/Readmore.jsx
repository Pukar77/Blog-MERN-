import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Readmore() {
  const location = useLocation();
  const { blog } = location.state;

  if (!blog) {
    return <p className="text-center text-gray-500 mt-10">No blog available</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
        <h1 className="text-4xl font-extrabold text-gray-800 text-center mb-6">
          {blog.title}
        </h1>
        <div className="flex justify-center mb-6">
          <img
            src={blog.url}
            alt={blog.title}
            className="w-1/2 max-w-2xl rounded-lg shadow-md"
          />
        </div>
        <p className="text-gray-700 text-lg leading-relaxed text-justify">
          {blog.text}
        </p>
      </div>
    </div>
  );
}

export default Readmore;
