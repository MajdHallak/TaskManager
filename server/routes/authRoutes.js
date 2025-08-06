import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await User.create({ firstname, lastname, email, password: hashed });
  const token = jwt.sign({ id: user._id, name: user.firstname }, process.env.JWT_SECRET);
  res.json({ token });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign({ id: user._id, name: user.firstname }, process.env.JWT_SECRET);
  res.json({ token });
});

export default router;
