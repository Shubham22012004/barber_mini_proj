import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import bookingsRoute from "./routes/bookings.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS (allow your React app)
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:3000"
  })
);

// Routes
app.use("/api/bookings", bookingsRoute);

// Root
app.get("/", (_req, res) => {
  res.send("Barber Shop API is running");
});

// Start
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
