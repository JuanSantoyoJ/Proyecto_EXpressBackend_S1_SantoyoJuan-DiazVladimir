import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { swaggerDocs } from "./swagger.js";
import { getDB } from "./db.js";
import authRoutes from "./routes/authRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import categoriesRoutes from "./routes/categoriesRoutes.js";
import moviesRoutes from "./routes/moviesRoutes.js";
import reviewsRoutes from "./routes/reviewsRoutes.js";


dotenv.config();

const app = express();
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";
const ALLOWED_ORIGINS = ORIGIN.split(",").map(s => s.trim());

// Sugerencia: soportar múltiples orígenes separados por coma
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);           // permitir tools/CLI
    return cb(null, ALLOWED_ORIGINS.includes(origin));
  },
  credentials: true
}));

app.use(express.json());

swaggerDocs(app);

app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});





// Ruta de salud

app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({ status: "OK", database: db.databaseName });
  } catch {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

export default app;
