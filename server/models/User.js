const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  name: String,
  email: String,
  avatarUrl: String,
  bio: String,
  totalPoints: { type: Number, default: 0 },
  challengesCompleted: { type: [String], default: [] },
  streak: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model("User", UserSchema);
