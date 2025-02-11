import express from "express";
import connectDB from "./config/database.js";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
connectDB();
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));