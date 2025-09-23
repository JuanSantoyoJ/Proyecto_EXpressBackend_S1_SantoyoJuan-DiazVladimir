import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getDB } from "./db.js";
import usersRoutes from "./routes/usersRoutes.js"; // 👈 nombre camelCase

dotenv.config();

const app = express();
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

app.use(usersRoutes);

app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({ status: "OK", database: db.databaseName });
  } catch {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

export default app;
