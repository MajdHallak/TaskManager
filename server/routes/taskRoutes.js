import express from "express";
import multer from "multer";
import Task from "../models/Task.js";
import User from "../models/User.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.get("/", async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id }).populate("assignee");
  res.json(tasks);
});

router.post("/", upload.single("image"), async (req, res) => {
  const { title, description, assignee, startDate, endDate } = req.body;
  const image = req.file?.path || null;
  const task = await Task.create({
    title,
    description,
    image,
    assignee,
    startDate,
    endDate,
    createdBy: req.user.id,
  });
  res.json(task);
});

router.patch("/:id/status", async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

export default router;
