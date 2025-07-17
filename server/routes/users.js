const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Sync on login or home load
router.post("/sync", async (req, res) => {
  const { uid, name, email, avatarUrl } = req.body;

  try {
    let user = await User.findOne({ uid });
    if (!user) {
      user = new User({ uid, name, email, avatarUrl });
      await user.save();
    }
    res.json(user);
  } catch (err) {
    console.error("User sync error:", err);
    res.status(500).send("Server error");
  }
});

// Fetch public profile
router.get("/:uid", async (req, res) => {
  try {
    const user = await User.findOne({ uid: req.params.uid });
    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Update profile
router.put("/:uid", async (req, res) => {
  console.log("🔧 Incoming PUT for UID:", req.params.uid);
  console.log("📦 Payload:", req.body);
  try {
    const updates = req.body;
    const user = await User.findOneAndUpdate({ uid: req.params.uid }, updates, { new: true });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).json({ error: "Server error" });
  }
});



module.exports = router;
