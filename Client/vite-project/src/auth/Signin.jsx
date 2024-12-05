import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";

function Signup() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    conpassword: "",
  });

  const Navigate = useNavigate();

  const handelinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const display = async (e) => {
    e.preventDefault();
    try {
      if (user.password !== user.conpassword) {
        alert("Not succes, password different");
        return;
      }
      let response = await fetch("http://localhost:8000/api/register/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: user.username,
          email: user.email,
          password: user.password,
        }),
      });

      const data1 = await response.json();
      console.log(data1);

      if (data1.status) {
        alert(data1.message);
        Navigate("/login");
      }
    } catch (e) {
      console.log("error occured ", e);
    }
    console.log(user);
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Sign Up
          </h2>
          <form onSubmit={display}>
            {/* Email Field */}
            <div className="mb-4"></div>

            {/* Username Field */}
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handelinput}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your username"
                required
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                onChange={handelinput}
                value={user.email}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your email"
                required
              />
            </div>

            {/* Password Field */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handelinput}
                value={user.password}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="conpassword"
                onChange={handelinput}
                value={user.conpassword}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Confirm your password"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300"
            >
              Sign Up
            </button>
          </form>

          {/* Sign In Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <Link to={"/login"} className="text-emerald-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Signup;
