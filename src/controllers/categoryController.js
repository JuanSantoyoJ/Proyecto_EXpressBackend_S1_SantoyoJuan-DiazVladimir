// src/controllers/categoryController.js
import {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory
} from "../models/categoryModel.js";

// Crear categoría
export async function createCategoryController(req, res) {
  try {
    const { nombre, descripcion } = req.body;
    if (!nombre || !descripcion) {
      return res.status(400).json({ error: "Nombre y descripción son obligatorios" });
    }

    const category = await createCategory({ nombre, descripcion });
    res.status(201).json(category);
  } catch (error) {
    if (error.message === "La categoría ya existe") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en createCategoryController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Obtener categorías
export async function getAllCategoriesController(req, res) {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    console.error("Error en getAllCategoriesController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Actualizar categoría
export async function updateCategoryController(req, res) {
  try {
    const { id } = req.params;
    const { nombre } = req.body;
    if (!nombre) return res.status(400).json({ error: "El nombre es obligatorio" });

    const result = await updateCategory(id, { nombre });
    res.json(result);
  } catch (error) {
    if (error.message === "ID inválido" || error.message === "Categoría no encontrada") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en updateCategoryController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Eliminar categoría
export async function deleteCategoryController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCategory(id);
    res.json(result);
  } catch (error) {
    if (error.message === "ID inválido" || error.message === "Categoría no encontrada") {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en deleteCategoryController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
