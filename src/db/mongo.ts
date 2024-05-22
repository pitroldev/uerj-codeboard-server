import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) throw new Error("MONGO_URI is not provided");

mongoose
  .connect(MONGO_URI, {
    serverSelectionTimeoutMS: 5000,
  })
  .then(() => {
    console.log("[MONGO] Successfully connected!");
  });

mongoose.connection.on("error", (err) => {
  console.log("[MONGO][ERROR][CRITICAL] Connection error:", err);
  process.exit(1);
});
