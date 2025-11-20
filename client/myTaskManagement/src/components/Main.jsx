import React from "react";
import {
  Clock,
  User,
  Flag,
  CheckCircle2,
  Circle,
  AlertCircle,
  Plus,
  Pencil,
  Trash2,
} from "lucide-react";

import { useDeleteTaskMutation, useGetAllTasksQuery } from "../apis/taskApi";
import { useNavigate } from "react-router-dom";

const TaskCard = ({ task }) => {
  const navigate = useNavigate();

  const [deleteTask] = useDeleteTaskMutation();
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "pending":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "assigned":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const handleDelete= async(id)=>{
    try {
      await deleteTask(id);
      
    } catch (error) {
      console.log("Error while deleting", error);
    }
  }
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return <CheckCircle2 className="text-green-400" size={18} />;
      case "in progress":
        return <AlertCircle className="text-yellow-400" size={18} />;
      default:
        return <Circle className="text-gray-400" size={18} />;
    }
  };

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-5 border border-gray-700/50 hover:border-gray-600 hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-300 cursor-pointer group">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-white font-semibold text-lg group-hover:text-gray-100 transition-colors line-clamp-2 flex-1">
          {task.title}
        </h3>
        {getStatusIcon(task.status)}
      </div>

      <p className="text-gray-400 text-sm mb-4 line-clamp-2 min-h-10">
        {task.description}
      </p>

      <div className="flex flex-wrap items-center gap-2 mb-4">
        {task.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{task.dueDate}</span>
          </div>
        </div>
        <div
          className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(
            task.priority
          )}`}
        >
          <div className="flex items-center gap-1.5">
            <Flag size={12} />
            <span>{task.priority}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate(`/task/update/${task._id}`)}
            className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-amber-500/30 hover:shadow-lg hover:shadow-amber-500/40 transform hover:scale-105 active:scale-95 border border-amber-400/30 hover:border-amber-300/50"
          >
            <Pencil size={14} className="stroke-[2.5]" />
            <span>Update</span>
          </button>
          <button onClick={()=>handleDelete(task._id)} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-semibold rounded-lg transition-all duration-200 shadow-md shadow-red-500/30 hover:shadow-lg hover:shadow-red-500/40 transform hover:scale-105 active:scale-95 border border-red-400/30 hover:border-red-300/50">
            <Trash2 size={14} className="stroke-[2.5]" />
            <span>Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const Main = () => {
  const navigate = useNavigate();

  const { data, isLoading, isError, error } = useGetAllTasksQuery();
  if (isLoading) {
    return <div>Loading Tasks.....</div>;
  }

  console.log(isError, error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-gray-400">
            Manage and track all your tasks in one place
          </p>
          <button
            onClick={() => navigate("/task")}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-lg shadow-lg shadow-blue-500/50 hover:shadow-xl hover:shadow-blue-500/60 transition-all duration-300 transform hover:scale-105 active:scale-95 border border-blue-400/30 hover:border-blue-300/50"
          >
            <Plus size={20} className="stroke-[2.5]" />
            <span>Create Task</span>
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.tasks?.map((task) => (
            <TaskCard key={task._id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
