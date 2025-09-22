import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { getDB } from "./db.js";
import usersRoutes from "./routes/users.routes.js"; // ⬅ Importamos rutas de usuarios

dotenv.config();

const app = express();
const ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));
app.use(express.json());

// Rutas de usuarios
app.use(usersRoutes); // ⬅ Conectamos todas las rutas definidas en users.routes.js

// Ruta de prueba /health
app.get("/health", (req, res) => {
  try {
    const db = getDB();
    res.json({
      status: "OK",
      message: "Servidor funcionando 🚀",
      database: db.databaseName
    });
  } catch (error) {
    res.status(500).json({ status: "ERROR", message: "DB no conectada" });
  }
});

export default app;
