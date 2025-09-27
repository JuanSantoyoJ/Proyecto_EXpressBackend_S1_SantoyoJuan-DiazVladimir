// src/controllers/movieController.js
import {
  createMovie,
  getAllMovies,
  updateMovie,
  deleteMovie
} from "../models/movieModel.js";

import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

/* ----------------------------------
   1. Crear Película
---------------------------------- */

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

export async function getMovieRankingController(req, res) {
  try {
    const db = getDB();
    const peliculas = await db.collection("peliculas").find().toArray();

    const ranking = [];

    for (let peli of peliculas) {
      const reseñas = await db.collection("reseñas")
        .find({ peliculaId: new ObjectId(peli._id) })
        .toArray();

      if (reseñas.length === 0) {
        ranking.push({ ...peli, puntaje: 0 });
        continue;
      }

      const promedio = reseñas.reduce((acc, r) => acc + (r.calificacion || 0), 0) / reseñas.length;
      const likes = reseñas.reduce((acc, r) => acc + (r.likes?.length || 0), 0);
      const dislikes = reseñas.reduce((acc, r) => acc + (r.dislikes?.length || 0), 0);

      const puntaje = (promedio * 2) + likes - dislikes;

      ranking.push({ ...peli, puntaje, promedio, likes, dislikes });
    }

    // Ordenar de mayor a menor puntaje
    ranking.sort((a, b) => b.puntaje - a.puntaje);

    res.json(ranking);
  } catch (error) {
    console.error("Error en getMovieRankingController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

export const getMovieByIdController = async (req, res) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const movie = await db.collection("movies").findOne({ _id: new ObjectId(id) });

    if (!movie) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    res.json(movie);
  } catch (error) {
    console.error("❌ Error obteniendo película:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};