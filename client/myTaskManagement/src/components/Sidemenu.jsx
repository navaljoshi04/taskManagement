import { ListTodo, PlusCircle } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const Sidemenu = ({ toggleSideBar, setToggleSideBar }) => {
  const navigate = useNavigate();
  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white transform ${
        toggleSideBar ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 z-50`}
    >
      <div className="flex items-center gap-3">
        <img
          src="https://images.seeklogo.com/logo-png/39/2/task-retail-technology-logo-png_seeklogo-394223.png"
          alt="logo"
          className="w-20 h-20 object-cover"
        />
      </div>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-[12px] font-semibold">Menu</h2>
        <button
          className="text-gray-300 hover:text-white"
          onClick={() => setToggleSideBar(false)}
        >
          ✕
        </button>
      </div>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-[12px] font-semibold">Task</h2>
        <button
          className="text-gray-300 hover:text-white cursor-pointer"
          onClick={() => navigate("/task")}
        >
          <PlusCircle />
        </button>
      </div>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <h2 className="text-[12px] font-semibold">Home</h2>
        <button
          className="text-gray-300 hover:text-white cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <ListTodo />
        </button>
      </div>
    </div>
  );
};

export default Sidemenu;
