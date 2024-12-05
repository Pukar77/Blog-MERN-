import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Navbar from "../navbar/Navbar";
import { useNavigate } from "react-router-dom";

function Login() {
  const [data, setData] = useState({
    username: "",
    password: "",
  });

  const Navigate = useNavigate();

  const handelinput = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const loginData = async (e) => {
    try {
      e.preventDefault();
      let response = await fetch("http://localhost:8000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });
      let data11 = await response.json();
      console.log(data11);

      if (data11.status) {
        localStorage.setItem("accesstoken", data11.token);
        alert(data11.message);
        Navigate("/home");
      } else {
        alert(data11.message);
      }
    } catch (e) {
      console.log("Error", e);
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="w-full max-w-md bg-white p-8 shadow-md rounded-md">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">
            Login
          </h2>
          <form onSubmit={loginData}>
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
                onChange={handelinput}
                value={data.username}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your username"
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
                value={data.password}
                onChange={handelinput}
                className="w-full mt-1 px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-emerald-500 focus:border-emerald-500"
                placeholder="Enter your password"
                required
              />
            </div>

            {/* Remember Me Checkbox */}
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-emerald-500 border-gray-300 rounded focus:ring-emerald-400"
                />
                <span className="ml-2 text-sm text-gray-600">Remember Me</span>
              </label>
              <a href="#" className="text-sm text-emerald-500 hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-2 px-4 rounded-md hover:bg-emerald-600 focus:outline-none focus:ring focus:ring-emerald-300"
            >
              Login
            </button>
          </form>

          {/* Create Account Link */}
          <p className="mt-4 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <Link to={"/signin"} className="text-emerald-500 hover:underline">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
