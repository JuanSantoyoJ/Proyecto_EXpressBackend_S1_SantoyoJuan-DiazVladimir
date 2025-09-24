// src/controllers/reviewController.js
import {
  createReview,
  getReviewsByMovie,
  updateReview,
  deleteReview
} from "../models/reviewModel.js";

export async function createReviewController(req, res) {
  try {
    const { peliculaId, usuarioId, titulo, comentario, calificacion } = req.body;
    if (!peliculaId || !usuarioId || !titulo || !comentario || !calificacion) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const review = await createReview({ peliculaId, usuarioId, titulo, comentario, calificacion });
    res.status(201).json(review);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function getReviewsByMovieController(req, res) {
  try {
    const { peliculaId } = req.params;
    const reviews = await getReviewsByMovie(peliculaId);
    res.json(reviews);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function updateReviewController(req, res) {
  try {
    const { id } = req.params;
    const { titulo, comentario, calificacion } = req.body;

    const result = await updateReview(id, { titulo, comentario, calificacion });
    res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}

export async function deleteReviewController(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteReview(id);
    res.json(result);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
}
