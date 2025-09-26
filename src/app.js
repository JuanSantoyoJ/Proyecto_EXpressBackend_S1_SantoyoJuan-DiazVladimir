import express from "express";
import dotenv from "dotenv";
import { swaggerDocs } from "./swagger.js";
import { getDB } from "./db.js";

import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";

dotenv.config();

const app = express();

// ===== CONFIGURACIÓN DE CORS =====
const ORIGIN = process.env.CORS_ORIGIN || "*";
const ALLOWED_ORIGINS = ORIGIN.split(",").map(s => s.trim());

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin || "*");
  }
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // Preflight
  }
  next();
});

// ===== MIDDLEWARES =====
app.use(express.json());

// ===== SWAGGER =====
swaggerDocs(app);

// ===== RUTAS =====
app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);

// ===== SALUD =====
app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({ status: "OK", database: db.databaseName });
  } catch {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

export default app;
