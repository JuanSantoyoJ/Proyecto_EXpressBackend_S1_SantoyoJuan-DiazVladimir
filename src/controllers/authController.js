import { getDB } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function loginController(req, res) {
  try {
    const { correo, contrasena } = req.body;
    console.log("📩 Datos recibidos:", { correo, contrasena });

    if (!correo || !contrasena) {
      console.log("❌ Faltan datos");
      return res.status(400).json({ error: "Correo y contraseña son requeridos" });
    }

    const db = getDB();
    if (!db) {
      console.log("❌ DB no conectada");
      return res.status(500).json({ error: "DB no conectada" });
    }

    const user = await db.collection("usuarios").findOne({ correo });
    console.log("👤 Usuario:", user);

    if (!user) {
      console.log("❌ Usuario no encontrado");
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    console.log("🔐 Comparando contraseña...");
    const match = await bcrypt.compare(contrasena, user.contrasena || "");
    console.log("Resultado bcrypt:", match);

    if (!match) {
      console.log("❌ Contraseña incorrecta");
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    console.log("🔑 Generando token...");
    const token = jwt.sign(
      { id: user._id.toString(), rol: user.rol || "user" }, // forzamos a string
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    console.log("✅ Login OK");
    res.json({ token });
  } catch (error) {
    console.error("🔥 Error en login:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
