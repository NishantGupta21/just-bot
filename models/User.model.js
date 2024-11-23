import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  userId: { type: Number, required: true, unique: true },
  joinDate: { type: Date, default: Date.now }, // Default to the current date when user interacts
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
