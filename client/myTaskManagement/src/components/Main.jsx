import React, { useEffect } from "react";
import {
  Clock,
  User,
  Flag,
  CheckCircle2,
  Circle,
  AlertCircle,
} from "lucide-react";
import { useGetAllTasksQuery } from "../apis/taskApi";

const TaskCard = ({ task }) => {
  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "medium":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "low":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

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

      {/* <div className="flex flex-wrap items-center gap-2 mb-4">
        {task.tags?.map((tag, index) => (
          <span
            key={index}
            className="px-2.5 py-1 bg-gray-700/50 text-gray-300 text-xs rounded-md border border-gray-600/50"
          >
            {tag}
          </span>
        ))}
      </div> */}

      <div className="flex items-center justify-between pt-4 border-t border-gray-700/50">
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <Clock size={14} />
            <span>{task.dueDate}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User size={14} />
            <span>{task.assignee}</span>
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
      </div>
    </div>
  );
};

const Main = () => {
  const { data, isLoading, error } = useGetAllTasksQuery();
  console.log(data, "data");
  console.log(isLoading, "data");
  console.log(error, "data");
  // Example tasks - will be replaced with API data
  const exampleTasks = [
    {
      id: 1,
      title: "Design new dashboard interface",
      description:
        "Create a modern and intuitive dashboard design with improved user experience and better data visualization.",
      status: "in progress",
      priority: "high",
      dueDate: "2024-01-15",
      assignee: "John Doe",
      tags: ["Design", "UI/UX", "Frontend"],
    },
    {
      id: 2,
      title: "Implement user authentication",
      description:
        "Set up secure authentication system with JWT tokens and refresh token mechanism.",
      status: "pending",
      priority: "high",
      dueDate: "2024-01-20",
      assignee: "Jane Smith",
      tags: ["Backend", "Security"],
    },
    {
      id: 3,
      title: "Write API documentation",
      description:
        "Document all API endpoints with examples and error handling scenarios.",
      status: "completed",
      priority: "medium",
      dueDate: "2024-01-10",
      assignee: "Mike Johnson",
      tags: ["Documentation", "API"],
    },
    {
      id: 4,
      title: "Optimize database queries",
      description:
        "Review and optimize slow database queries to improve application performance.",
      status: "in progress",
      priority: "medium",
      dueDate: "2024-01-18",
      assignee: "Sarah Williams",
      tags: ["Database", "Performance"],
    },
    {
      id: 5,
      title: "Add unit tests",
      description:
        "Write comprehensive unit tests for critical components to ensure code quality.",
      status: "pending",
      priority: "low",
      dueDate: "2024-01-25",
      assignee: "Tom Brown",
      tags: ["Testing", "Quality"],
    },
    {
      id: 6,
      title: "Setup CI/CD pipeline",
      description:
        "Configure continuous integration and deployment pipeline for automated testing and deployment.",
      status: "pending",
      priority: "medium",
      dueDate: "2024-01-22",
      assignee: "Emily Davis",
      tags: ["DevOps", "CI/CD"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white mb-2">My Tasks</h1>
          <p className="text-gray-400">
            Manage and track all your tasks in one place
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {exampleTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;
