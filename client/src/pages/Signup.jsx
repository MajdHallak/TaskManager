/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "majd",
    lastName: "hallak",
    email: "majdhallak90@gmail.com",
    password: "123123",
    confirmPassword: "123123",
    termsAccepted: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const { firstName, lastName, email, password } = formData;
      const name = `${firstName} ${lastName}`;

      const res = await API.post("/signup", {
        name,
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-2 signin-bg-gradient">
      <div className="w-5/6 max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-row lg:flex-row h-3/4">
          <div className="flex-1 p-8 lg:p-8 xl:p-16">
            <h1 className="text-2xl font-bold mb-1">Your Logo</h1>
            <h2 className="text-xl font-semibold mt-6 mb-2 text-[#0A1D4E]">Welcome</h2>
            <p className="text-sm text-gray-500 mb-6">
              It's just three steps and we'll start making your tasks easier.
            </p>
            <form onSubmit={handleSubmit} className="space-y-2">
              <p className="text-sm">First Name</p>
              <input
                type="text"
                name="firstName"
                placeholder="Enter First Name"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-l-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
              <p className="text-sm">Last Name</p>
              <input
                type="text"
                name="lastName"
                placeholder="Enter Last Name"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-l-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
              <p className="text-sm">Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-l-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
              <p className="text-sm">Password</p>

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-l-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
              <p className="text-sm">Confirm Password</p>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-2 py-2 bg-gray-50 border border-gray-200 rounded-l-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                required
              />
              <div className="flex items-start py-4">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className="mr-2 mt-1"
                  required
                />
                <label className="text-xs text-gray-500">
                  Completing these steps means you agree to accept{" "}
                  <a href="" className="text-blue-600 underline">
                    terms & conditions
                  </a>{" "}
                  and{" "}
                  <a href="" className="text-blue-600 underline">
                    privacy policy
                  </a>
                </label>
              </div>
              <button
                type="submit"
                disabled={loading || !formData.email || !formData.password}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Signing up...
                  </div>
                ) : (
                  "Sign up"
                )}
              </button>
            </form>
            <p className="text-sm text-gray-500 mt-4">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 underline">
                Login
              </Link>
            </p>
          </div>

          {/* Right Side - Illustration */}
          <div className="flex-1 bg-gradient-to-br from-indigo-400 via-purple-400 to-blue-500 p-8 lg:p-12 xl:p-16 flex items-center justify-center relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
              <div className="absolute bottom-20 right-10 w-20 h-20 bg-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-white rounded-full"></div>
            </div>

            {/* Main Illustration Container */}
            <div className="relative z-10 bg-white/20 backdrop-blur-sm rounded-3xl p-8 max-w-md">
              {/* Computer Screen */}
              <div className="relative">
                {/* Monitor */}
                <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  {/* Screen Content */}
                  <div className="bg-white rounded-lg p-4 mb-4">
                    {/* Profile Card */}
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <div className="w-8 h-8 bg-gray-500 rounded-full"></div>
                      </div>
                      <div className="flex-1">
                        <div className="h-3 bg-gray-300 rounded mb-2"></div>
                        <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                      </div>
                    </div>

                    {/* Content Lines */}
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-200 rounded"></div>
                      <div className="h-2 bg-gray-200 rounded w-4/5"></div>
                      <div className="h-2 bg-gray-200 rounded w-3/5"></div>
                    </div>
                  </div>

                  {/* Bottom Dock */}
                  <div className="flex justify-center gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                {/* Security Lock Icon */}
                <div className="absolute -top-4 -left-4 bg-white rounded-xl p-3 shadow-lg">
                  <div className="w-6 h-6 border-2 border-gray-400 rounded-sm relative">
                    <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-3 h-3 border-2 border-gray-400 border-b-0 rounded-t-full"></div>
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-gray-400 rounded-full"></div>
                  </div>
                </div>

                {/* Key Icon */}
                <div className="absolute -bottom-8 -right-6 bg-white rounded-xl p-3 shadow-lg transform rotate-12">
                  <div className="w-6 h-6 relative">
                    <div className="w-3 h-3 border-2 border-gray-400 rounded-full absolute top-0 left-0"></div>
                    <div className="w-1 h-4 bg-gray-400 absolute bottom-0 left-1 rounded-full"></div>
                    <div className="w-2 h-1 bg-gray-400 absolute bottom-1 right-0 rounded"></div>
                  </div>
                </div>
              </div>

              {/* Character */}
              <div className="absolute -bottom-4 -right-8 transform rotate-6">
                <div className="relative">
                  {/* Body */}
                  <div className="w-16 h-20 bg-white rounded-2xl shadow-lg relative">
                    {/* Head */}
                    <div className="w-10 h-10 bg-amber-200 rounded-full absolute -top-8 left-1/2 transform -translate-x-1/2 shadow-md">
                      {/* Hair */}
                      <div className="w-8 h-6 bg-gray-800 rounded-full absolute -top-2 left-1/2 transform -translate-x-1/2"></div>
                      {/* Eyes */}
                      <div className="flex gap-1 absolute top-3 left-1/2 transform -translate-x-1/2">
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                        <div className="w-1 h-1 bg-gray-800 rounded-full"></div>
                      </div>
                    </div>

                    {/* Arms */}
                    <div className="w-3 h-8 bg-amber-200 rounded-full absolute top-2 -left-2 transform rotate-12"></div>
                    <div className="w-3 h-8 bg-amber-200 rounded-full absolute top-2 -right-2 transform -rotate-12"></div>

                    {/* Legs */}
                    <div className="w-3 h-10 bg-blue-600 rounded-full absolute -bottom-2 left-2"></div>
                    <div className="w-3 h-10 bg-blue-600 rounded-full absolute -bottom-2 right-2"></div>
                  </div>
                </div>
              </div>

              {/* Plant */}
              <div className="absolute bottom-4 left-4">
                <div className="w-8 h-6 bg-green-500 rounded-t-full"></div>
                <div className="w-6 h-4 bg-amber-800 rounded-b-lg mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
