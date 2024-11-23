import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true, // Ensures userId is unique
    },
    createdAt: {
      type: Date,
      default: Date.now, // Automatically sets the creation date
    },
  },
  { collection: "users" } // Optional: specify the collection name
);

// Check if the model is already compiled (to prevent overwriting)
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;
