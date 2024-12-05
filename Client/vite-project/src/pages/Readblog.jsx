import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

function Readblog() {
  const location = useLocation();
  const { invdata } = location.state; // Extracting the `invdata` from the state
  const [Blogg, getBlog] = useState(null); // Initializing the state to null (not an empty array)

  const gettoken = () => {
    return localStorage.getItem("accesstoken");
  };

  const readingblog = async () => {
    try {
      const token = gettoken();
      let response = await fetch(
        `http://localhost:8000/api/home/readblog/${invdata}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let data = await response.json();
      if (data && data.status) {
        getBlog(data.blogs); // Storing the blog data in the state
      }
      console.log(data);
    } catch (e) {
      console.log("Some error occured", e);
    }
  };

  useEffect(() => {
    readingblog();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      {Blogg ? (
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4">{Blogg.title}</h1>
          <img
            className="w-full h-64 object-cover rounded-lg mb-4"
            src={Blogg.url}
            alt={Blogg.title}
          />
          <p className="text-gray-700 text-lg leading-relaxed mb-4">{Blogg.text}</p>
          <p className="text-gray-500 text-sm">Likes: {Blogg.like}</p>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600">No Blog Found</p>
      )}
    </div>
  );
}

export default Readblog;
