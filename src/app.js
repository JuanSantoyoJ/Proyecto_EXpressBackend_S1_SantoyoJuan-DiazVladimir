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

// 1️⃣ Configuración de CORS
const ORIGIN = process.env.CORS_ORIGIN || "*";
const ALLOWED_ORIGINS = ORIGIN.split(",").map(s => s.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true); // Permitir Swagger y herramientas locales
      if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes("*")) {
        return cb(null, true);
      }
      return cb(new Error("CORS bloqueado: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    optionsSuccessStatus: 204 // Evita errores con preflight
  })
);

// No usamos app.options("*") porque Express 5 ya no lo soporta
// y cors() maneja preflight automáticamente

// 2️⃣ Parseo JSON
app.use(express.json());

// 3️⃣ Swagger UI
swaggerDocs(app);

// 4️⃣ Rutas de la API
app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);

// 5️⃣ Ruta de salud
app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({ status: "OK", database: db.databaseName });
  } catch {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

export default app;
