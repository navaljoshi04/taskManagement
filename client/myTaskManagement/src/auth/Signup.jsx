import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  console.log(formData);
  return (
    <>
      <div className="flex h-screen bg-amber-50">
        <div className="w-1/2 h-full flex items-center justify-center">
          <div
            className="w-full h-[90%] mx-4 bg-contain bg-center bg-no-repeat rounded-lg shadow-2xl overflow-hidden"
            style={{ backgroundImage: "url('/backgroundHotBalloon.jpg')" }}
          ></div>
        </div>

        <div className="h-full w-1/2 flex items-center justify-center px-8">
          <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
            <form  className="space-y-5">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Sign Up</h2>

              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block font-medium text-gray-700 text-[12px]"
                >
                  Name
                </label>
                <input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e)}
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-4 text-[12px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[12px] font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e)}
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border text-[12px] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[12px] font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => handleChange(e)}
                  placeholder="Enter your password"
                  className="w-full px-4 text-[12px] py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
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
      </div>
    </>
  );
};

export default Signup;
