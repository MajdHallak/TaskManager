import express from "express";
import User from "../models/User.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/users", protect, async (req, res) => {
  const users = await User.find({}, "_id name");
  res.json(users);
});

export default router;
