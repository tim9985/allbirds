import { connect } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/allbirdsDB";

async function connectDB() {
  try {
    await connect(MONGODB_URI, {
    });
    console.log("MongoDB connected (allbirdsDB)");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export default connectDB;
