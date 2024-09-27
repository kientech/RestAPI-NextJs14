import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string; // Ensure MONGO_URI is a string

const connect = async (): Promise<void> => {
  const connectionState: number = mongoose.connection.readyState;

  if (connectionState === 1) {
    console.log("Already connected");
    return;
  }

  try {
    // Attempt to connect to the MongoDB database
    await mongoose.connect(MONGO_URI);
    console.log("Successfully connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connect;
