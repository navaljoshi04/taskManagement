import { Menu, Search, Bell, User, Sidebar } from "lucide-react";
import React, { useState } from "react";
import Sidemenu from "./Sidemenu";
const Navbar = () => {
  const [toggleSideBar, setToggleSideBar] = useState(false);
  return (
    <>
      <Sidemenu
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      <nav className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
        <div className="h-16 flex items-center justify-between px-6">
          {/* Left Section - Menu & Logo */}
          <div className="flex items-center gap-4">
            <button
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group"
              onClick={() => setToggleSideBar(!toggleSideBar)}
            >
              <Sidebar
                className="text-white group-hover:text-gray-300 transition-colors"
                size={22}
              />
            </button>
            <div className="flex items-center gap-3">
              <img
                src="https://images.seeklogo.com/logo-png/39/2/task-retail-technology-logo-png_seeklogo-394223.png"
                alt="logo"
                className="w-20 h-20 object-cover"
              />
            </div>
          </div>

          {/* Center Section - Search */}
          <div className="flex-1 max-w-2xl mx-8 hidden md:flex">
            <div className="flex items-center gap-3 w-full px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-gray-600 focus-within:bg-gray-800 transition-all duration-200">
              <Search className="text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search tasks, projects..."
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-3">
            {/* Mobile Search Icon */}
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <Search className="text-white" size={20} />
            </button>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
              <Bell
                className="text-white group-hover:text-gray-300 transition-colors"
                size={20}
              />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile */}
            <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 group">
              <User
                className="text-white group-hover:text-gray-300 transition-colors"
                size={20}
              />
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search tasks, projects..."
              className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-sm"
            />
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
