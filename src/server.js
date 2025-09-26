import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Ruta de prueba /health
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

// Conectar DB y levantar servidor
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ No se pudo iniciar el servidor:", err);
    });
