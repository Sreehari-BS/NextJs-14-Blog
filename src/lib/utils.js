import mongoose from "mongoose";

const connection = {};

const connectDB = async () => {
  try {
    if (connection.isConnected) {
      console.log("Using existing connection");
      return;
    }
    const db = mongoose.connect(process.env.MONGO_URI);
    connection.isConnected = (await db).connections[0].readyState;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export default connectDB;
