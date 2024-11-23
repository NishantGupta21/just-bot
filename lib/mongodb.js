// Import the necessary module
import mongoose from "mongoose";

// Function to connect to MongoDB
const connectMongo = async () => {
  try {
    // Connect to MongoDB using the provided URI and options
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

// Export the function
export default connectMongo;
