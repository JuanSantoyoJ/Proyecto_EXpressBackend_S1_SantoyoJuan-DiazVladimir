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

const ORIGIN = process.env.CORS_ORIGIN || "*";
const ALLOWED_ORIGINS = ORIGIN.split(",").map(s => s.trim());

app.use(
  cors({
    origin: (origin, cb) => {
      // Permite sin origen (Swagger UI local, cURL, Postman)
      if (!origin) return cb(null, true);

      // Verifica si está en la lista de orígenes permitidos
      if (ALLOWED_ORIGINS.includes(origin) || ALLOWED_ORIGINS.includes("*")) {
        return cb(null, true);
      }

      return cb(new Error("CORS bloqueado: " + origin));
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true, // Necesario para Authorization con Bearer
    preflightContinue: false,
    optionsSuccessStatus: 204
  })
);

// Asegura que OPTIONS funcione correctamente
app.options("*", cors());



app.use(express.json());

swaggerDocs(app);

app.use(authRoutes);
app.use(usersRoutes);
app.use(categoriesRoutes);
app.use(moviesRoutes);
app.use(reviewsRoutes);



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
