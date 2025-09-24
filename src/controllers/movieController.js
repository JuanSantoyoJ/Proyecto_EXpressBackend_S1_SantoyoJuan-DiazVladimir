// src/controllers/movieController.js
import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} from "../models/movieModel.js";

export async function createMovieController(req, res) {
  try {
    const { nombre, categoriaId, portada, descripcion } = req.body;
    if (!nombre || !categoriaId || !portada) {
      return res.status(400).json({ error: "Nombre, categoría y portada son obligatorios" });
    }

    const movie = await createMovie({ nombre, categoriaId, portada, descripcion });
    res.status(201).json(movie);
  } catch (error) {
    if (error.message.includes("no existe") || error.message.includes("inválido")) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en createMovieController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function getAllMoviesController(req, res) {
  try {
    const movies = await getAllMovies();
    res.json(movies);
  } catch (error) {
    console.error("Error en getAllMoviesController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function updateMovieController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, categoriaId, portada } = req.body;

    const result = await updateMovie(id, { nombre, categoriaId, portada });
    res.json(result);
  } catch (error) {
    if (error.message.includes("inválido") || error.message.includes("no encontrada")) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en updateMovieController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export async function deleteMovieController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteMovie(id);
    res.json(result);
  } catch (error) {
    if (error.message.includes("inválido") || error.message.includes("no encontrada")) {
      return res.status(400).json({ error: error.message });
    }
    console.error("Error en deleteMovieController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
