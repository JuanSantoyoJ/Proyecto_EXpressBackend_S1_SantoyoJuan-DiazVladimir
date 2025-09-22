import dotenv from "dotenv";
import { connectDB } from "./db.js";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

// Conectamos a la DB y luego levantamos el servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Servidor escuchando en http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("❌ No se pudo iniciar el servidor:", error);
});
