import React, { useState } from "react";
import { useCreateTaskMutation } from "../apis/taskApi";

const TaskComponent = () => {
  const [createTask, { isLoading }] = useCreateTaskMutation();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
    userID: "",
  });

  if (isLoading) {
    return <div>Loading .... please wait</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async () => {
    try {
      const result = await createTask(formData).unwrap();
      console.log("Task created", result);
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };
  return (
    <div className="bg-black h-screen flex justify-center items-center">
      <div className="bg-white shadow-lg w-2/3 h-4/6 rounded-lg p-8 overflow-y-auto">
        <h2 className="text-blue-700 font-bold text-center text-[28px] mb-6">
          Create Task
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Description <span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">
              Assign User <span className="text-red-500">*</span>
            </label>
            <select
              name="userID"
              value={formData.userID}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              <option value="">Select a user...</option>
              {/* TODO: Populate with users from API */}
              <option value="user1">User 1</option>
              <option value="user2">User 2</option>
            </select>
          </div>
          <button
            type="submit"
            onClick={handleCreateTask}
            className="w-full text-[14px] bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] mt-2"
          >
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
