import express from "express";
import cors from "cors";
import connectDB from "./config/database.js";
import passport from "passport"; 
import helmet from "helmet"
import morgan from "morgan"
import router from "./routes/index.js";
import './config/passportJwt.js';
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(express.json());
app.use(errorHandler)
app.use(cors({ origin: ['http://localhost:5173', 'https://your-production-domain.com'] }));
app.use(passport.initialize());
app.use(helmet());
app.use(morgan("combined")); // Logging

// Routes
app.use("/", router)
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start Server
connectDB();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));