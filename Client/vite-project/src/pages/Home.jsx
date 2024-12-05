import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import BlogCart from "../blog-cart/BlogCart";
import { GoPlusCircle } from "react-icons/go";
import { Link } from "react-router-dom";
function Home() {
  const [userinfo, setUserinfo] = useState([]);
  const getTokenFromLocalStorage = () => {
    return localStorage.getItem("accesstoken");
  };
  const userDetail = async () => {
    const token = getTokenFromLocalStorage();
    console.log(token);
    let response = await fetch("http://localhost:8000/api/home/welcome", {
      method: "get",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    let data = await response.json();
    console.log(data);
    setUserinfo(data.user);

    console.log(data.user.Username);
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="fixed bottom-4 right-4">
        <Link to="/postblog">
          {" "}
          <div className="flex gap-4 items-center">
            Upload your blog <GoPlusCircle className="text-6xl" />
          </div>
        </Link>
      </div>

      <h1 className="m-4 text-center bg-green-300 leading-4 p-5">
        Welcome dear {userinfo.Username}
      </h1>

      <div className="mt-5">
        <BlogCart />
      </div>
    </div>
  );
}

export default Home;
