import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Calendar,
  User,
  CheckCircle,
  XCircle,
  LogOut,
} from "lucide-react";
import "./styles.css";
import cardlogo from "./../assets/cardlogo.png";
import { useNavigate } from "react-router-dom";

const TaskDashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  // Mock data for demonstration - replace with your actual API call
  const mockTasks = [
    {
      _id: "1",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: false,
      image: cardlogo,
    },
    {
      _id: "2",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: true,
      image: "/api/placeholder/64/64",
    },
    {
      _id: "3",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: false,
      image: "/api/placeholder/64/64",
    },
    {
      _id: "4",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: false,
      image: "/api/placeholder/64/64",
    },
    {
      _id: "5",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: true,
      image: "/api/placeholder/64/64",
    },
    {
      _id: "6",
      title: "Title Task",
      description:
        "Lorem ipsum dolor sit amet consectetur. Feugiat quam hac iaculis viverra. Ut risus posuere ipsum in sit aenean. Quis et sed molestusda.",
      assignee: { name: "Hassan Aljeahi", avatar: "/api/placeholder/32/32" },
      startDate: "2024-01-15",
      endDate: "2024-01-20",
      completed: false,
      image: "/api/placeholder/64/64",
    },
  ];

  useEffect(() => {
    // Replace this with your actual API call
    const fetchTasks = async () => {
      try {
        // const response = await fetch('/api/tasks');
        // const data = await response.json();
        // setTasks(data);

        // For now, using mock data
        setTimeout(() => {
          setTasks(mockTasks);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const TaskCard = ({ task }) => (
    <div className="bg-[#f5f6f7] rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-center mb-4 relative">
        <div className="w-16 h-16 bg-blue-200 rounded-lg flex items-center justify-center mx-auto">
          <div className="w-8 h-8 rounded">
            <img src={cardlogo} alt="logo" />
          </div>
        </div>

        <button className="absolute top-0 right-0 text-gray-400 hover:text-gray-600">
          <MoreVertical size={20} />
        </button>
      </div>

      <h3 className="font-semibold text-lg text-gray-900 mb-2 text-center">{task.title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed mb-6">{task.description}</p>

      <div className="space-y-3 bg-[#ffffff] p-2 rounded-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <User size={16} className="text-gray-600" />
            </div>
            <span className="text-sm text-gray-700">
              {task.assignee?.name || "Replace User Name"}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            {task.completed ? (
              <>
                <CheckCircle size={16} className="text-green-500" />
                <span className="text-sm text-green-600">Completed</span>
              </>
            ) : (
              <>
                <XCircle size={16} className="text-red-500" />
                <span className="text-sm text-red-600">Not Completed</span>
              </>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1">
            <Calendar size={16} className="text-green-500" />
            <span className="text-sm text-green-600">
              {task.startDate ? formatDate(task.startDate) : "Replace Start Date"}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar size={16} className="text-red-500" />
            <span className="text-sm text-red-600">
              {task.endDate ? formatDate(task.endDate) : "Replace End Date"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#274297] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar and Main Content */}
      <div className="flex min-h-screen ">
        {/* Sidebar */}
        <aside className="fixed top-0 left-0 h-screen w-[15%] bg-white text-white p-6 border-r border-gray-200 z-50">
          <div className="space-y-2">
            <div className="font-bold text-xl text-gray-900 mb-10">Your Logo</div>
            <button className="w-full flex items-center justify-center px-[56px] py-[9px] sidebar-nav">
              <div className="">
                <span className="font-medium">Tasks</span>
              </div>
            </button>
          </div>

          <div className="absolute bottom-6 left-6">
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
          <header className="bg-white border-b border-gray-200 px-6 py-4 w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <h1 className="text-xl font-semibold text-gray-900">Tasks</h1>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="text-sm font-medium text-gray-900">Hassan Aljeahi</div>
                    <div className="text-xs text-gray-500">Email@example.com</div>
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="p-6">
            <div className="flex justify-end mb-4">
              <div className="flex flex-row space-x-4">
                <button
                  onClick={() => navigate("/add-task")}
                  className="bg-[#274297] text-white rounded-lg flex items-center justify-center space-x-2 transition-colors addbtn px-4 py-2"
                >
                  <p className="text-xs">Add</p>
                </button>

                {/* Searchbar */}
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 h-9"
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 ">
              {filteredTasks.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-400 rounded"></div>
                    </div>
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No tasks found</h3>
                  <p className="text-gray-600">
                    {searchTerm
                      ? "Try adjusting your search terms"
                      : "Create your first task to get started"}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTasks.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default TaskDashboard;
