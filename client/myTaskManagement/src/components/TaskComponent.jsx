import React, { useEffect, useState } from "react";
import {
  useCreateTaskMutation,
  useGetSingleTaskQuery,
  useUpdateTaskMutation,
} from "../apis/taskApi";
import { CheckCircle, X } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const TaskComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isUpdate = Boolean(id);
  const [createTask, { isLoading }] = useCreateTaskMutation();

  const [updateTask] = useUpdateTaskMutation();
  const { data } = useGetSingleTaskQuery(id, { skip: !id });

  console.log(data, "single task data--.");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending",
    dueDate: "",
  });

  useEffect(() => {
    if (!id) return;
    if (!data?.task) return;
    if (data?.task) {
      setFormData({
        title: data?.task?.title,
        description: data?.task?.description,
        status: data?.task?.status,
        dueDate: data?.task?.dueDate,
      });
    }
  }, [id, data]);

  const [successMsg, setSuccessMsg] = useState("");
  if (isLoading) {
    return <div>Loading .... please wait</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (isUpdate) {
        await updateTask({ id, body: formData }).unwrap();
        setSuccessMsg("Task updated successfully!");
        navigate("/home");
        setFormData({
          title: "",
          description: "",
          status: "",
          dueDate: "",
        });
      } else {
        const result = await createTask(formData).unwrap();
        console.log("Task created", result);
        setFormData({
          title: "",
          description: "",
          status: "",
          dueDate: "",
        });
        setSuccessMsg("Sucessfully created the task ");
      }
    } catch (error) {
      console.log("Error creating task:", error);
    }
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6 flex justify-center items-center">
      <div className="bg-gray-800/50 backdrop-blur-sm shadow-2xl shadow-gray-900/50 w-full max-w-2xl rounded-xl p-8 border border-gray-700/50 overflow-y-auto">
        {successMsg && (
          <div className="flex items-center justify-between p-4 bg-green-500/20 border-l-4 border-green-500 text-green-400 rounded-lg shadow-sm transition-all duration-300 mb-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />
              <span className="text-sm font-medium">{successMsg}</span>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMsg("")}
              className="text-green-400 hover:text-green-300 transition-colors shrink-0"
              aria-label="Close success message"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
        <h2 className="text-white font-bold text-center text-[28px] mb-6">
          {isUpdate ? "Update Task" : "Create Task"}
        </h2>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Title <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter task title..."
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Description <span className="text-red-400">*</span>
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter task description..."
              rows={4}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 resize-none transition-all"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all"
            >
              <option value="pending" className="bg-gray-700">
                Pending
              </option>
              <option value="in-progress" className="bg-gray-700">
                In Progress
              </option>
              <option value="completed" className="bg-gray-700">
                Completed
              </option>
              <option value="cancelled" className="bg-gray-700">
                Cancelled
              </option>
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">
              Due Date
            </label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700/50 border border-gray-600/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all [color-scheme:dark]"
            />
          </div>

          <button
            type="submit"
            onClick={handleSubmit}
            className={`w-full text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg transform hover:scale-105 active:scale-95 mt-2 ${
              isUpdate
                ? "bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-500/40 border border-amber-400/30 hover:border-amber-300/50"
                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 border border-blue-400/30 hover:border-blue-300/50"
            }`}
          >
            {isUpdate ? "Update Task" : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskComponent;
