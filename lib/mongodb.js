import mongoose from "mongoose";

const mongoURI =
  "mongodb+srv://Admin:BUFOQvmue2RuonIg@clusterjust.gus47.mongodb.net/"; // Replace with your MongoDB URI

// Establish new MongoDB connection
const connectMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;
