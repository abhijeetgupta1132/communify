const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ================= SIGNUP =================
router.post("/signup", async (req, res) => {
  try {
    let { username, email, password } = req.body;

    // ✅ Normalize email
    email = email.trim().toLowerCase();

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await new User({
      username,
      email,
      password: hashed,
    }).save();

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.status(201).json({
      token,
      username: user.username,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    let { email, password } = req.body;

    // ✅ Normalize email
    email = email.trim().toLowerCase();

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(400).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    res.json({
      token,
      username: user.username,
      id: user._id,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
