import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import statusRoutes from "./routes/statusRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); // Logging middleware for development

// Routes
app.use("/api/status", statusRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("API is running...");
});

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found" });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("error:", err.stack);
  res.status(500).json({ error: "Server Error" });
});

// start server
const startServer = async () => {};
try {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
} catch (err) {
  process.exit(1);
}
startServer();
