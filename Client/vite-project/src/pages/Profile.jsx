import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";
import { Link } from "react-router-dom";

function Profile() {
  const [detail, setDetail] = useState([]);

  const getToken = () => {
    return localStorage.getItem("accesstoken");
  };

  const userDetail = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.log("Token not available");
      }

      let response = await fetch("http://localhost:8000/api/home/welcome", {
        method: "get",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      let data = await response.json();
      console.log(data);
      setDetail(data.user);
    } catch (e) {
      console.log("Error occured", e);
    }
  };

  useEffect(() => {
    userDetail();
  }, []);

  return (
    <div>
      <Navbar />
      <section className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-10 h-full">
          <div className="flex justify-center items-center h-full">
            <div className="w-full max-w-4xl">
              <div className="bg-white shadow-md rounded-lg overflow-hidden flex flex-col md:flex-row">
                <div className="bg-gradient-to-r from-purple-400 to-indigo-500 text-white flex flex-col items-center justify-center p-6 md:w-1/3">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                    alt="Avatar"
                    className="rounded-full w-20 h-20 mb-5"
                  />
                  <h5 className="text-xl font-semibold">{detail.Username}</h5>
                  <p className="text-sm font-light">Web Designer</p>
                  <i className="far fa-edit text-lg mt-5"></i>
                </div>
                <div className="p-6 md:w-2/3">
                  <h6 className="text-lg font-semibold mb-4">Information</h6>
                  <hr className="border-gray-300 mb-4" />
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h6 className="text-sm font-medium">Role</h6>
                      <p className="text-sm text-gray-600">{detail.role}</p>
                    </div>
                    <div>
                      <h6 className="text-sm font-medium">Userid</h6>
                      <p className="text-sm text-gray-600">{detail.userid}</p>
                    </div>
                  </div>
                  <h6 className="text-lg font-semibold mt-6 mb-4">Email</h6>
                  <p className="text-sm text-gray-600">{detail.email}</p>
                  <hr className="border-gray-300 mb-4" />
                  <div>
                    <a href="#!" className="text-blue-600 text-xl">
                      <i className="fab fa-facebook"></i>
                    </a>
                    <a href="#!" className="text-blue-400 text-xl">
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a href="#!" className="text-pink-500 text-xl">
                      <i className="fab fa-instagram"></i>
                    </a>
                    <Link to="/edit">
                      {" "}
                      <button className="bg-green-400 rounded p-2 w-36 text-center text-white flex justify-center items-center ">
                        Edit Your Profile
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;
