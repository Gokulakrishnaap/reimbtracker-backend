import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import mongoose from "mongoose";
import helmet from "helmet";
import { apiRouter } from "./routes/apiRoute.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(morgan("common"));
app.use(helmet());
app.use(cors());

// Connection to MongoDB
mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => console.log("Connected to MongoDB"));

app.get("/", (req, res) => {
  res.send("Hello, RI-Tracker API !!");
});

app.use("/api/auth", apiRouter);

app.listen(PORT, () => console.log("App Started in Port", PORT));
