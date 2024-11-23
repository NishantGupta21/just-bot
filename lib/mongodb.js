// lib/mongodb.js
import mongoose from "mongoose";

const connectMongo = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const mongoURI =
    "mongodb+srv://Admin:BUFOQvmue2RuonIg@clusterjust.gus47.mongodb.net/";
  await mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectMongo;
