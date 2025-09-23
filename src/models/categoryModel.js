// src/models/categoryModel.js
import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

// Crear categoría
export async function createCategory({ nombre }) {
  const db = getDB();

  // Verificar que no exista duplicada
  const existing = await db.collection("categorias").findOne({ nombre });
  if (existing) {
    throw new Error("La categoría ya existe");
  }

  const doc = { nombre, createdAt: new Date() };
  const { insertedId } = await db.collection("categorias").insertOne(doc);
  return { _id: insertedId, ...doc };
}

// Obtener todas las categorías
export async function getAllCategories() {
  const db = getDB();
  return await db.collection("categorias").find().toArray();
}

// Actualizar categoría
export async function updateCategory(id, { nombre }) {
  const db = getDB();

  if (!ObjectId.isValid(id)) throw new Error("ID inválido");

  const result = await db.collection("categorias").updateOne(
    { _id: new ObjectId(id) },
    { $set: { nombre } }
  );

  if (result.matchedCount === 0) throw new Error("Categoría no encontrada");

  return { message: "Categoría actualizada correctamente" };
}

// Eliminar categoría
export async function deleteCategory(id) {
  const db = getDB();

  if (!ObjectId.isValid(id)) throw new Error("ID inválido");

  const result = await db.collection("categorias").deleteOne({ _id: new ObjectId(id) });

  if (result.deletedCount === 0) throw new Error("Categoría no encontrada");

  return { message: "Categoría eliminada correctamente" };
}
