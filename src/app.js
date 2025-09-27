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

// ===== CONFIGURACIÓN DE CORS =====
// Puedes definir en tu .env: CORS_ORIGIN=https://tusitio.com,https://otrodominio.com
const ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(cors({
  origin: ORIGIN === "*" ? true : ORIGIN.split(","),
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

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
