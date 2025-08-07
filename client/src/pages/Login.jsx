/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";
import API from "../services/api";

export default function Login() {
  const [error, setError] = useState();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { email, password } = formData;
      const res = await API.post("/login", { email, password });
      localStorage.setItem("token", res.data.token);
      console.log("Redirecting...");
      navigate("/tasks");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 signin-bg-gradient">
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-row lg:flex-row">
          {/* Left Side - Form */}
          <div className="flex-1 p-8 lg:p-12 xl:p-16">
            <div className="max-w-md mx-auto">
              {/* Logo */}
              <div className="mb-12">
                <h1 className="text-2xl font-bold text-gray-800">Your Logo</h1>
              </div>

              {/* Welcome Text */}
              <div className="mb-10">
                <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Welcome back!</h2>
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <Link
                    to="/signup"
                    className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
                  >
                    Signup
                  </Link>
                </p>
              </div>

              {/* Form */}
              <form className="space-y-6">
                {/* Email Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter Work Email"
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500"
                  />
                </div>

                {/* Password Field */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Password"
                      className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 pr-12"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me Checkbox */}
                <div className="flex items-center mb-8 ">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                  />
                  <label htmlFor="rememberMe" className="ml-3  text-sm font-medium text-gray-700">
                    Remember me
                  </label>
                </div>

                {/* Login Button */}
                <button
                  onClick={handleSubmit}
                  disabled={loading || !formData.email || !formData.password}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  {loading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing in...
                    </div>
                  ) : (
                    "Login"
                  )}
                </button>
              </form>
            </div>
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
}
