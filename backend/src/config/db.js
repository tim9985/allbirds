import { connect } from "mongoose";

async function connectDB() {
  try {
    await connect("mongodb://127.0.0.1:27017/allbirdsDB", {
    });
    console.log("MongoDB connected (allbirdsDB)");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

export default connectDB;
