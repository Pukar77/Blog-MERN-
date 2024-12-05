import React, { useEffect, useState } from "react";
import { Aside } from "./Aside";
import { Link, NavLink } from "react-router-dom";
import Readblog from "./Readblog";
import { Button } from "flowbite-react";
import ButtonComponent from "./PageComonent/ButtonComponent";

export const Allpost = () => {
  const [blogdetail, setBlogDetail] = useState([]);
  const [readblog, setReadBlog] = useState([]);

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

  // const readNewBlog = async (id) => {
  //   try {
  //     const token = getTokenFromLocalStorage();
  //     if (!token) {
  //       console.log("Token not available");
  //     }
  //     let response = await fetch(
  //       `http://localhost:8000/api/home/readblog/${id}`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     let data = await response.json();
  //     console.log(data);
  //     setBlogDetail(data.blogs);
  //   } catch (e) {
  //     console.log("Some error occured", e);
  //   }
  // };

  useEffect(() => {
    indblog();
  }, []);

  return (
    <div className="flex">
      <div>
        <Aside />
      </div>

      <div className="w-full">
        <h1 className="text-center">Your blogs</h1>

        <div>
          {blogdetail && blogdetail.length > 0 ? (
            blogdetail.map((item, index) => {
              console.log("Blog item:", item);
              return (
                <div className="border-2 border-red-300 p-4 mb-1" key={index}>
                  <h2>Title: {item.title || "No title available"}</h2>
                  <h2>Created at: {item.createdAt}</h2>
                  {/* Base */}

                  <a
                    className="group relative inline-block text-sm font-medium text-white focus:outline-none focus:ring"
                    href="#"
                  >
                    <span className="absolute inset-0 border border-red-600 group-active:border-red-500"></span>
                    <NavLink
                      className="block border border-red-600 bg-red-600 px-12 py-3 transition-transform active:border-red-500 active:bg-red-500 group-hover:-translate-x-1 group-hover:-translate-y-1"
                      to="/readblog"
                      state={{ invdata: item._id }}
                    >
                      {" "}
                      <ButtonComponent id={item._id} />
                      {/* <Button id={item._id} /> */}
                    </NavLink>
                  </a>

                  {/* Border */}
                </div>
              );
            })
          ) : (
            <p>Data not available</p>
          )}
        </div>
      </div>
    </div>
  );
};
