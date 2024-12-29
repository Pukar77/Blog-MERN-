import React, { useEffect, useState } from "react";
import { Aside } from "./Aside";
import { NavLink } from "react-router-dom";
import ButtonComponent from "./PageComonent/ButtonComponent";

export const Allpost = () => {
  const [blogdetail, setBlogDetail] = useState([]);

  // Function to retrieve the token from local storage
  const getTokenFromLocalStorage = () => {
    const token = localStorage.getItem("accesstoken");
    console.log("Retrieved token:", token); // Debug token retrieval
    return token;
  };

  // Function to fetch individual blog data
  const indblog = async () => {
    console.log("Fetching individual blog data...");
    try {
      const token = getTokenFromLocalStorage();
      if (!token) {
        console.error("No access token found in local storage!");
        return;
      }

      const response = await fetch(
        "http://localhost:8000/api/home/getindividualblog",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log("Fetched data:", data);
      setBlogDetail(data.message || []);
    } catch (error) {
      console.error("An error occurred while fetching the blog data:", error);
    }
  };

  useEffect(() => {
    indblog();
  }, []);

  return (
    <div className="flex">
      {/* Aside Section */}
      <div className="w-1/4 min-w-[250px] bg-gray-100 h-screen">
        <Aside />
      </div>

      {/* Main Content Section */}
      <div className="w-3/4 p-4">
        <h1 className="text-center text-xl font-bold mb-4">Your Blogs</h1>

        <div>
          {blogdetail && blogdetail.length > 0 ? (
            blogdetail.map((item, index) => {
              console.log("Blog item:", item);
              return (
                <div
                  className="border-2 border-red-300 p-4 mb-4 rounded-lg"
                  key={index}
                >
                  <h2 className="text-lg font-semibold">
                    Title: {item.title || "No title available"}
                  </h2>
                  <h3 className="text-sm text-gray-600">
                    Created at: {item.createdAt}
                  </h3>

                  <NavLink
                    className="mt-2 inline-block bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-500 transition"
                    to="/readblog"
                    state={{ invdata: item._id }}
                  >
                    <ButtonComponent id={item._id} />
                  </NavLink>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600">No blogs available</p>
          )}
        </div>
      </div>
    </div>
  );
};
