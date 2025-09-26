import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./db.js";
import app from "./app.js";

const PORT = process.env.PORT || 3000;

// Ruta de salud antes del listen
app.get("/health", (req, res) => {
    res.json({ status: "OK", message: "Servidor funcionando correctamente" });
});

// Conectamos DB y levantamos el server
connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ No se pudo iniciar el servidor:", err);
    });
