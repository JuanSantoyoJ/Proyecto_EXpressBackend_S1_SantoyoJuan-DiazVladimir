// src/models/reviewModel.js
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

// Crear reseña
export async function createReview({ peliculaId, usuarioId, titulo, comentario, calificacion }) {
  const db = getDB();

  // Validaciones básicas
  if (!ObjectId.isValid(peliculaId)) throw new Error("ID de película inválido");
  if (!ObjectId.isValid(usuarioId)) throw new Error("ID de usuario inválido");
  if (calificacion < 1 || calificacion > 5) throw new Error("La calificación debe estar entre 1 y 5");

  // Verificar que la película existe
  const pelicula = await db.collection("peliculas").findOne({ _id: new ObjectId(peliculaId) });
  if (!pelicula) throw new Error("La película no existe");

  // Verificar que el usuario existe
  const usuario = await db.collection("usuarios").findOne({ _id: new ObjectId(usuarioId) });
  if (!usuario) throw new Error("El usuario no existe");

  const doc = { peliculaId: new ObjectId(peliculaId), usuarioId: new ObjectId(usuarioId), titulo, comentario, calificacion, createdAt: new Date() };
  const { insertedId } = await db.collection("reseñas").insertOne(doc);
  return { _id: insertedId, ...doc };
}

// Obtener reseñas por película
export async function getReviewsByMovie(peliculaId) {
  const db = getDB();
  if (!ObjectId.isValid(peliculaId)) throw new Error("ID de película inválido");

  return await db.collection("reseñas").find({ peliculaId: new ObjectId(peliculaId) }).toArray();
}
// descargar reseñas
export async function DescargarReviewsByMovie(peliculaId) {
  const db = getDB();
  if (!ObjectId.isValid(peliculaId)) throw new Error("ID de película inválido");

  return await db.collection("reseñas").find({ peliculaId: new ObjectId(peliculaId) }).toArray();
}

// Actualizar reseña
export async function updateReview(id, { titulo, comentario, calificacion }) {
  const db = getDB();
  if (!ObjectId.isValid(id)) throw new Error("ID de reseña inválido");
  if (calificacion && (calificacion < 1 || calificacion > 5)) throw new Error("La calificación debe estar entre 1 y 5");

  const updateFields = {};
  if (titulo) updateFields.titulo = titulo;
  if (comentario) updateFields.comentario = comentario;
  if (calificacion) updateFields.calificacion = calificacion;

  const result = await db.collection("reseñas").updateOne({ _id: new ObjectId(id) }, { $set: updateFields });
  if (result.matchedCount === 0) throw new Error("Reseña no encontrada");

  return { message: "Reseña actualizada correctamente" };
}

// Eliminar reseña
export async function deleteReview(id) {
  const db = getDB();
  if (!ObjectId.isValid(id)) throw new Error("ID de reseña inválido");

  const result = await db.collection("reseñas").deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) throw new Error("Reseña no encontrada");

  return { message: "Reseña eliminada correctamente" };
}
