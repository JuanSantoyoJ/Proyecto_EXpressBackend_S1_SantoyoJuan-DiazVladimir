import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { swaggerDocs } from "./swagger.js";
import { getDB } from "./db.js";

// Rutas
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";

dotenv.config();

const app = express();

// ===============================
// 🔹 CONFIGURACIÓN DE CORS
// ===============================
const ALLOWED_ORIGINS = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(",").map(o => o.trim())
  : ["*"];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (ALLOWED_ORIGINS.includes("*") || ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200); // ✅ responder preflight inmediatamente
  }
  next();
});



// ✅ Express 5 maneja automáticamente los preflight requests con app.use(cors())
// ❌ NO usamos app.options("*") ni "(.*)" porque generan error en path-to-regexp

// ===============================
// 🔹 MIDDLEWARES
// ===============================
app.use(express.json());

// ===============================
// 🔹 SWAGGER
// ===============================
swaggerDocs(app);

// ===============================
// 🔹 RUTAS PRINCIPALES
// ===============================
app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);

// ===============================
// 🔹 ENDPOINT DE SALUD
// ===============================
app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({ status: "OK", database: db.databaseName });
  } catch {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

app.get("/", (req, res) => {
  res.json({ status: "OK", message: "Backend corriendo correctamente" });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Ruta no encontrada" });
});

// Manejo de errores internos
app.use((err, req, res, next) => {
  console.error("Error interno:", err);
  res.status(500).json({ error: "Error interno del servidor" });
});


export default app;
