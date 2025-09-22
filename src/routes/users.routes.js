import { Router } from "express";
import { getDB } from "../db.js";

const router = Router();

// Ruta para crear un usuario
router.post("/users", async (req, res) => {
  try {
    const { correo, nombre, direccion } = req.body;

    // Validación básica
    if (!correo || !nombre) {
      return res.status(400).json({ error: "Correo y nombre son obligatorios" });
    }

    // Insertamos en MongoDB
    const db = getDB();
    const result = await db.collection("usuarios").insertOne({
      correo,
      nombre,
      direccion: direccion || "",
      createdAt: new Date()
    });

    res.status(201).json({ message: "Usuario creado", id: result.insertedId });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

// Ruta para listar usuarios
router.get("/users", async (req, res) => {
  try {
    const db = getDB();
    const usuarios = await db.collection("usuarios").find().toArray();
    res.json(usuarios);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
});

export default router;