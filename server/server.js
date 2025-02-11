import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import passport from "passport"; 
import authRoutes from "./routes/auth.routes.js";

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(passport.initialize());


// Routes
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
connectDB();
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));