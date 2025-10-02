// src/routes/reviewsRoutes.js
import { Router } from "express";
import {
  createReviewController,
  getReviewsByMovieController,
  DescargarReviewsByMovieController,
  updateReviewController,
  deleteReviewController,
  getAllReviewsController,
  likeReviewController,
  dislikeReviewController,
  getMyReviewsController
} from "../controllers/reviewController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validarCampos } from "../middlewares/validationMiddleware.js";

import {
  validarCrearResena,
  validarActualizarResena,
  validarEliminarResena
} from "../validators/reviewValidators.js";

const router = Router();

// ✅ Crear reseña
router.post(
  "/reviews",
  verifyToken,
  validarCrearResena,
  validarCampos,
  createReviewController
);

// ✅ Mi lista (reseñas del usuario autenticado)
router.get("/reviews/milist", verifyToken, getMyReviewsController);

// ✅ Reseñas de una película
router.get("/reviews/movie/:peliculaId", getReviewsByMovieController);

// ✅ descargar reseñas de una película
router.get("/reviews/movie/:peliculaId", DescargarReviewsByMovieController);


// ✅ Todas las reseñas (solo admin)
router.get("/reviews", verifyToken, getAllReviewsController);

// ✅ Actualizar reseña
router.put(
  "/reviews/:id",
  verifyToken,
  validarActualizarResena,
  validarCampos,
  updateReviewController
);

// ✅ Eliminar reseña
router.delete(
  "/reviews/:id",
  verifyToken,
  validarEliminarResena,
  validarCampos,
  deleteReviewController
);

// ✅ Likes / Dislikes
router.post("/reviews/:id/like", verifyToken, likeReviewController);
router.post("/reviews/:id/dislike", verifyToken, dislikeReviewController);

export default router;
