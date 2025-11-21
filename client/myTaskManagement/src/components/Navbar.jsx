import { Menu, Search, User, Sidebar, UserRound, LogOut } from "lucide-react";
import React, { useContext, useState } from "react";
import Sidemenu from "./Sidemenu";
import { SearchContext } from "../context/SearchContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  const [toggleSideBar, setToggleSideBar] = useState(false);
  const { searchText, setSearchText } = useContext(SearchContext);

  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user", user);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <>
      <Sidemenu
        toggleSideBar={toggleSideBar}
        setToggleSideBar={setToggleSideBar}
      />
      <nav className="bg-gradient-to-r from-gray-900 to-black border-b border-gray-800 shadow-lg">
        <div className="h-16 flex items-center justify-between px-6">
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

          <div className="flex-1 max-w-2xl mx-8 hidden md:flex">
            <div className="flex items-center gap-3 w-full px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700 focus-within:border-gray-600 focus-within:bg-gray-800 transition-all duration-200">
              <Search className="text-gray-400" size={18} />
              <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                placeholder="Search tasks, projects..."
                className="flex-1 bg-transparent text-white outline-none placeholder-gray-500 text-sm"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
              <Search className="text-white" size={20} />
            </button>

            <div className="relative group">
              <button className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                <User
                  className="text-white group-hover:text-gray-300 transition-colors"
                  size={20}
                />
              </button>

              <div className="absolute right-0 mt-2 w-56  bg-gray-900 border border-gray-700 rounded-xl shadow-xl  p-4 opacity-0 scale-95 translate-y-1  group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0 transition-all duration-200 z-50  ">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 border border-gray-700">
                    <UserRound className="text-gray-300" size={20} />
                  </div>

                  <div>
                    <p className="text-white font-semibold text-sm">
                      {user?.name}
                    </p>
                    <p className="text-gray-400 text-xs">{user?.email}</p>
                  </div>
                </div>

                <div className="mt-4 border-t border-gray-700 pt-3">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg text-sm font-medium transition-all duration-200 group"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:hidden px-4 pb-3">
          <div className="flex items-center gap-3 px-4 py-2 bg-gray-800/50 rounded-lg border border-gray-700">
            <Search className="text-gray-400" size={18} />
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
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
