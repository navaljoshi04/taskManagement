import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { XCircle, X, CheckCircle } from "lucide-react";
const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState("");
  const handleChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError(false);
      setSuccess("");

      if (!formData.email || !formData.password) {
        setError("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        formData
      );
      console.log(response.data);
      setSuccess("Login successfull ! Redirecting to home page...");
      setTimeout(() => {
        setSuccess("");
        navigate("/home");
      }, 2000);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Error while logging in";
      setError(errorMessage);
      console.log(error);
    }
  };
  console.log(formData);
  return (
    <div
      className="h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{ backgroundImage: "url('/backgroundHotBalloon.jpg')" }}
    >
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-600 bg-clip-text text-transparent mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-gray-600 font-medium">
              Login to your Task Management System
            </p>
          </div>

          {error && (
            <div className="flex items-center justify-between p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3">
                <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
              <button
                type="button"
                onClick={() => setError(false)}
                className="text-red-500 hover:text-red-700 transition-colors shrink-0"
                aria-label="Close error message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}

          {success && (
            <div className="flex items-center justify-between p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm transition-all duration-300">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-500 shrink-0" />
                <span className="text-sm font-medium">{success}</span>
              </div>
              <button
                type="button"
                onClick={() => setSuccess("")}
                className="text-green-600 hover:text-green-800 transition-colors shrink-0"
                aria-label="Close success message"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="email" className="text-[12px] font-mono block">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="text-[12px] font-mono block">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-[14px] focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full text-[14px] bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-[1.02] active:scale-[0.98] mt-2"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
