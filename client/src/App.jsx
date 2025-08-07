import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import TaskDashboard from "./pages/TaskDashboard";
import AddTask from "./pages/AddTask";
import { useEffect, useState } from "react";
import { useAuth } from "./context/AuthContext";

const App = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/tasks" /> : <Navigate to="/login" />}
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/tasks"
          element={isAuthenticated ? <TaskDashboard /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-task"
          element={isAuthenticated ? <AddTask /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
