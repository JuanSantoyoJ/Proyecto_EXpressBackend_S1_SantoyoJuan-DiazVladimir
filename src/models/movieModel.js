// src/models/movieModel.js
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

// Crear película
export async function createMovie({ nombre, categoriaId, portada, descripcion = "" }) {
  const db = getDB();

  if (!ObjectId.isValid(categoriaId)) {
    throw new Error("ID de categoría inválido");
  }
  const categoria = await db.collection("categorias").findOne({ _id: new ObjectId(categoriaId) });
  if (!categoria) {
    throw new Error("La categoría no existe");
  }

  const doc = { nombre, categoriaId: new ObjectId(categoriaId), portada, descripcion, createdAt: new Date() };
  const { insertedId } = await db.collection("peliculas").insertOne(doc);
  return { _id: insertedId, ...doc };
}

// Obtener todas las películas
export async function getAllMovies() {
  const db = getDB();
  return await db.collection("peliculas").find().toArray();
}

// Actualizar película
export async function updateMovie(id, { nombre, categoriaId, portada }) {
  const db = getDB();

  if (!ObjectId.isValid(id)) throw new Error("ID de película inválido");
  if (categoriaId && !ObjectId.isValid(categoriaId)) throw new Error("ID de categoría inválido");

  const updateFields = {};
  if (nombre) updateFields.nombre = nombre;
  if (categoriaId) updateFields.categoriaId = new ObjectId(categoriaId);
  if (portada) updateFields.portada = portada;

  const result = await db.collection("peliculas").updateOne(
    { _id: new ObjectId(id) },
    { $set: updateFields }
  );

  if (result.matchedCount === 0) throw new Error("Película no encontrada");

  return { message: "Película actualizada correctamente" };
}

// Eliminar película
export async function deleteMovie(id) {
  const db = getDB();

  if (!ObjectId.isValid(id)) throw new Error("ID de película inválido");

  const result = await db.collection("peliculas").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) throw new Error("Película no encontrada");

  return { message: "Película eliminada correctamente" };
}
