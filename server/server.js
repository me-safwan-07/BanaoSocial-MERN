import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import passport from "passport"; 
import helmet from "helmet"
import morgan from "morgan"
import authRoutes from "./routes/auth.routes.js";
import postRoutes from "./routes/post.routes.js";	

const app = express();

// Middleware
app.use(express.json());
app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(passport.initialize());
app.use(helmet());
app.use(morgan("combined")); // Logging
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
connectDB();
app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));