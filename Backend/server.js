import dotenv from "dotenv";
import cors from "cors";
import express from "express";
import connectDB from "./config/db.js";

import assistanceRoutes from "./routes/assistanceRoute.js";
import emergencyRoutes from "./routes/emergencyRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3002;

app.use(cors());
app.use(express.json());

app.use("/api/assistance", assistanceRoutes);
app.use("/api/emergency", emergencyRoutes);


const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
