"use client";

import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { Link } from "react-router-dom";

export function Aside() {
  return (
    <div className="">
      <Sidebar
        aria-label="Sidebar with logo branding example"
        className="bg-gray-400 h-screen w-60"
      >
        <Sidebar.Items className="mt-12">
          <Sidebar.ItemGroup>
            <Sidebar.Item href="#" icon={HiChartPie} className="text-left">
              Rimal Blog
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiViewBoards} className="text-left">
              <Link to="/allpost">Your Post </Link>
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiInbox} className="text-left">
              Comments
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser} className="text-left">
              Stats
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiShoppingBag} className="text-left">
              Products
            </Sidebar.Item>
            <Sidebar.Item href="#" icon={HiUser} className="text-left">
              <Link to="/profile"> Your Profile </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
}
