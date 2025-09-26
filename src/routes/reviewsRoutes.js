// src/routes/reviewsRoutes.js
import { Router } from "express";
import {
  createReviewController,
  getReviewsByMovieController,
  updateReviewController,
  deleteReviewController,
  getAllReviewsController,
  likeReviewController,
  dislikeReviewController
} from "../controllers/reviewController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validarCampos } from "../middlewares/validationMiddleware.js";


import {
  validarCrearResena,
  validarActualizarResena,
  validarEliminarResena
} from "../validators/reviewValidators.js";

const router = Router();

// ✅ Crear reseña (cualquier usuario autenticado)
router.post(
  "/reviews",
  verifyToken,
  validarCrearResena,
  validarCampos,
  createReviewController
);

// ✅ Obtener reseñas de una película (público)
router.get("/reviews/:peliculaId", getReviewsByMovieController);
router.get("/reviews", verifyToken, getAllReviewsController);
router.get("/reviews/movie/:peliculaId", getReviewsByMovieController);



// ✅ Actualizar reseña (solo el usuario dueño de la reseña)
router.put(
  "/reviews/:id",
  verifyToken,
  validarActualizarResena,
  validarCampos,
  updateReviewController
);

// ✅ Eliminar reseña (solo el usuario dueño de la reseña)
router.delete(
  "/reviews/:id",
  verifyToken,
  validarEliminarResena,
  validarCampos,
  deleteReviewController
);

router.post("/reviews/:id/like", verifyToken, likeReviewController);
router.post("/reviews/:id/dislike", verifyToken, dislikeReviewController);

export default router;
