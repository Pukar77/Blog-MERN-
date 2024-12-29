"use client";

import { Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiViewBoards,
  HiOutlineMenuAlt1,
} from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Aside() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar Toggle Button */}
      <button
        className="p-2 bg-gray-700 text-white fixed z-50 rounded-md m-2 lg:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiOutlineMenuAlt1 size={24} />
      </button>

      {/* Sidebar */}
      <Sidebar
        aria-label="Responsive Sidebar"
        className={`bg-gray-800 text-gray-300 fixed h-screen z-40 transition-all duration-300 ease-in-out ${
          isOpen ? "w-60" : "w-16"
        } lg:w-60`}
      >
        <Sidebar.Items className="mt-10">
          <Sidebar.ItemGroup>
            {/* Sidebar Header */}
            <div
              className={`text-black font-bold text-xl p-4 transition-opacity duration-300 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              Rimal Blog
            </div>

            {/* Sidebar Links */}
            <Sidebar.Item
              as="div"
              icon={HiChartPie}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/" className="flex items-center">
                Dashboard
              </Link>
            </Sidebar.Item>
            <Sidebar.Item
              as="div"
              icon={HiViewBoards}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/allpost">Your Posts</Link>
            </Sidebar.Item>
            <Sidebar.Item
              as="div"
              icon={HiInbox}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/comments">Comments</Link>
            </Sidebar.Item>
            <Sidebar.Item
              as="div"
              icon={HiUser}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/stats">Stats</Link>
            </Sidebar.Item>
            <Sidebar.Item
              as="div"
              icon={HiShoppingBag}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/products">Products</Link>
            </Sidebar.Item>
            <Sidebar.Item
              as="div"
              icon={HiUser}
              className="hover:bg-green-700 transition duration-200 rounded-md"
            >
              <Link to="/profile">Your Profile</Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
