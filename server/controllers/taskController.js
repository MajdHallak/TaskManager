/* eslint-disable no-unused-vars */
import Task from "../models/Task.js";
import User from "../models/User.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.userId });
  res.json(tasks);
};

export const addTask = async (req, res) => {
  try {
    const { title, description, startDate, endDate, assignee } = req.body;

    const assigneeUser = await User.findById(assignee);
    if (!assigneeUser) return res.status(404).json({ message: "Assignee not found" });

    const image = req.file ? `/uploads/${req.file.filename}` : null;

    const task = await Task.create({
      title,
      description,
      startDate,
      endDate,
      assignee: {
        id: assigneeUser._id,
        name: assigneeUser.name,
      },
      image,
      userId: req.userId,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Add task failed", error: err.message });
  }
};

export const toggleStatus = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    task.status = !task.status;
    await task.save();

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: "Update status failed" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    if (task.userId.toString() !== req.userId) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await task.remove();
    res.json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: "Delete failed" });
  }
};
