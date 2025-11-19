import React from "react";
import {
  X,
  Home,
  CheckSquare,
  Calendar,
  Settings,
  User,
  BarChart3,
  FolderOpen,
} from "lucide-react";

const Sidemenu = ({ toggleSideBar, setToggleSideBar }) => {
  const menuItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: CheckSquare, label: "My Tasks", active: false },
    { icon: Calendar, label: "Calendar", active: false },
    { icon: FolderOpen, label: "Projects", active: false },
    { icon: BarChart3, label: "Analytics", active: false },
    { icon: User, label: "Profile", active: false },
    { icon: Settings, label: "Settings", active: false },
  ];

  return (
    <>
      {/* Backdrop Overlay */}
      {toggleSideBar && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={() => setToggleSideBar(false)}
        />
      )}


      <div
        className={`fixed top-0 left-0 h-full w-72 bg-gradient-to-b from-gray-900 to-black text-white transform ${
          toggleSideBar ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50 shadow-2xl border-r border-gray-800`}
      >
 
        <div className="p-6 border-b border-gray-800/50">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <img
                src="https://images.seeklogo.com/logo-png/39/2/task-retail-technology-logo-png_seeklogo-394223.png"
                alt="logo"
                className="w-12 h-12 object-cover rounded-lg"
              />
              <div>
                <h3 className="text-white font-semibold text-sm">
                  Task Management
                </h3>
                <p className="text-gray-400 text-xs">Organize your work</p>
              </div>
            </div>
            <button
              className="p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 text-gray-400 hover:text-white"
              onClick={() => setToggleSideBar(false)}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Menu Items */}
        <div className="p-4">
          <nav className="space-y-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <button
                  key={index}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    item.active
                      ? "bg-gray-800 text-white shadow-lg"
                      : "text-gray-400 hover:bg-gray-800/50 hover:text-white"
                  }`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800/50">
          <div className="bg-gray-800/50 rounded-lg p-4">
            <p className="text-gray-400 text-xs mb-2">Need help?</p>
            <button className="text-white text-sm font-medium hover:text-gray-300 transition-colors">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidemenu;
