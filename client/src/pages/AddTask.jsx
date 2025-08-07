/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import API from "../services/api";
import { FaAngleLeft } from "react-icons/fa";

export default function AddTask() {
  const [title, setTitle] = useState("");
  const [assignee, setAssignee] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [image, setImage] = useState(null);

  const [users, setUsers] = useState([]);
  const [file, setFile] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      const res = await API.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(res.data);
      setUsers(res.data);
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("startDate", startDate);
    formData.append("endDate", endDate);
    formData.append("assignee", assignee);
    if (image) formData.append("image", image);

    const token = localStorage.getItem("token");
    await axios.post("/api/tasks", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Task created");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* sidebar */}
      <aside className="fixed top-0 left-0 h-screen w-[15%] bg-white text-white p-6 border-r border-gray-200 z-50">
        <div className="space-y-2">
          <div className="font-bold text-xl text-gray-900 mb-10">Your Logo</div>
          <button className="w-full flex items-center space-x-3 px-4 py-3 text-left rounded-lg bg-blue-50 text-blue-600 border border-blue-200">
            <div className="w-5 h-5 bg-[#274297] rounded"></div>
            <span className="font-medium">Tasks</span>
          </button>
        </div>

        <div className="absolute bottom-6 left-6">
          <button
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
            onClick={() => {
              console.log("Fetched users:", users);
            }}
          >
            <p>testing</p>
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 text-red-600 hover:text-red-700 transition-colors"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      <div className="ml-auto w-[85%]">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 w-full h-20">
          <div className="flex justify-between items-center h-full px-6">
            <button
              onClick={() => {
                console.log(navigate("/tasks"));
              }}
            >
              <FaAngleLeft size={32} />
            </button>
            <h1 className="text-2xl font-bold mr-auto ml-4">Add Task</h1>
            <div className="text-right">
              <p className="font-semibold">Hassan Aljeshi</p>
              <p className="text-sm text-gray-500">Email@example.com</p>
            </div>
          </div>
        </header>

        <main className="p-6">
          <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6">
            <h2 className="bg-blue-900 text-white text-lg px-4 py-2 rounded-t">Task Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
              <input
                type="text"
                placeholder="Enter Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                required
                className="border p-2 rounded w-full pr-4"
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email} className="text-black">
                    {user.email}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                required
                className="border p-2 rounded w-full"
              />
            </div>
            <div className="p-4">
              <textarea
                placeholder="Enter Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="border p-2 rounded w-full h-24"
              ></textarea>
            </div>
            <div className="p-4">
              <label className="block mb-2 font-medium">Image</label>
              <div className="flex items-center space-x-4 border-1 rounded-xl">
                <input
                  id="fileInput"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="hidden"
                />

                <label
                  htmlFor="fileInput"
                  className="cursor-pointer bg-[#274297] text-white px-4 py-2 rounded-l-xl hover:bg-blue-100 hover:text-black transition"
                >
                  Choose File
                </label>

                {/* File name display */}
                <span className="text-sm text-gray-600">{file ? file.name : "No file chosen"}</span>
              </div>
            </div>
            <div className="px-4 pb-4">
              <button type="submit" className="bg-[#274297] text-white py-2 px-6 rounded w-full">
                Save
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}
