// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
