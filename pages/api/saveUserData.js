import connectMongo from "../../lib/mongodb";
import User from "../../models/User";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await connectMongo();

      const { userId, joinDate } = req.body;

      // Create a new user object
      const user = new User({
        userId,
        joinDate,
      });

      // Save the user to MongoDB
      await user.save();

      // Send a response back
      res.status(201).json({ message: "User data saved successfully!" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error saving user data", error: error.message });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
