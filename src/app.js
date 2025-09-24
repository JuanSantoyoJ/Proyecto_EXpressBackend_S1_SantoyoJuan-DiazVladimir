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

app.use(cors({ origin: ORIGIN }));
app.use(express.json());



app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);

swaggerDocs(app);




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
