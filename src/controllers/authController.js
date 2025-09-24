import { getDB } from "../db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.SECRET_KEY;

export async function loginController(req, res) {
    try {
        const { correo, contrasena } = req.body;

        if (!correo || !contrasena) {
            return res.status(400).json({ error: "Correo y contraseña son requeridos" });
        }

        const db = getDB();
        const user = await db.collection("usuarios").findOne({ correo });
        if (!user) return res.status(400).json({ error: "Usuario no encontrado" });

        // Verificar contraseña

        const match = await bcrypt.compare(contrasena, user.contrasena);
        if (!match) return res.status(400).json({ error: "Contraseña incorrecta" });

        // Generar token JWT
        const token = jwt.sign(
            { id: user._id, rol: user.rol },
            SECRET_KEY,
            { expiresIn: "20m" }
        );

        res.json({ token });
    } catch (error) {
        console.error("Error en login:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}
