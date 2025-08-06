import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startDate: Date,
  endDate: Date,
  completed: { type: Boolean, default: false },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

export default mongoose.model("Task", taskSchema);
