import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { swaggerDocs } from "./swagger.js";
import { getDB } from "./db.js";

// Importar rutas
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
const ORIGIN = process.env.CORS_ORIGIN || "*";

app.use(
  cors({
    origin: ORIGIN === "*" ? "*" : ORIGIN.split(","),
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Necesario para manejar preflight requests (método OPTIONS)
app.options("*", cors());

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

export default app;
