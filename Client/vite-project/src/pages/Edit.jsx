import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";

function Edit() {
  const [userinfo, setUserInfo] = useState([]);

  const gettoken = () => {
    return localStorage.getItem("accesstoken");
  };

  const userdetail = async () => {
    const token = gettoken();
    if (!token) {
      console.log("Token not available");
      alert("You must first login to change the user info");
    } else {
      try {
        let response = await fetch("http://localhost:8000/api/home/welcome", {
          method: "get",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        let data = await response.json();
        console.log(data);
        setUserInfo(data);
      } catch (e) {
        console.log(
          "Some error occured during fetching api, error of catch blog",
          e
        );
      }
    }
  };

  useEffect(() => {
    userdetail();
  }, []);

  return (
    <div>
      <Navbar />
      
    </div>
  );
}

export default Edit;
