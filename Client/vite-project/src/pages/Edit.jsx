import React, { useEffect, useState } from "react";
import Navbar from "../navbar/Navbar";

function Edit() {
  const [userinfo, setUserInfo] = useState({});
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");

  // Retrieve the access token from localStorage
  const getToken = () => localStorage.getItem("accesstoken");

  // Fetch user details from the backend
  const fetchUserDetails = async () => {
    const token = getToken();
    if (!token) {
      console.log("Token not available");
      alert("You must log in first to edit user information");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/api/home/welcome", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("User details response status:", response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Fetched user details:", data);
      setUserInfo(data.user || {});
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Update user information
  const updateUser = async (id) => {
    const token = getToken();
    try {
      const payload = { username, email };
      console.log("Updating user with payload:", payload);

      const response = await fetch(
        `http://localhost:8000/api/edituser/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("Update user response status:", response.status);
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response text:", errorText);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Update user response data:", data);
      alert("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  // Initialize user details on component load
  useEffect(() => {
    fetchUserDetails();
  }, []);

  // Update email and username fields when userinfo changes
  useEffect(() => {
    if (userinfo) {
      setEmail(userinfo.email || "");
      setUsername(userinfo.username || ""); // Updated for case consistency
    }
  }, [userinfo]);

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (userinfo && userinfo.userid) {
      updateUser(userinfo.userid);
    } else {
      console.error("User ID is missing or invalid.");
    }
  };

  return (
    <div>
      <Navbar />
      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto mt-8 p-4 border border-gray-300 rounded-lg shadow"
      >
        <h2 className="text-lg font-semibold mb-4">Edit User Information</h2>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium text-sm text-gray-500 peer-focus:text-blue-600"
          >
            Email
          </label>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            name="username"
            id="username"
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label
            htmlFor="username"
            className="peer-focus:font-medium text-sm text-gray-500 peer-focus:text-blue-600"
          >
            Username
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          Submit and Edit
        </button>
      </form>
    </div>
  );
}

export default Edit;
