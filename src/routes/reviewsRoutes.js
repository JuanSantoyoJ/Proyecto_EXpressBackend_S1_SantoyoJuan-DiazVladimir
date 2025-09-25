// src/routes/reviewsRoutes.js
import { Router } from "express";
import {
  createReviewController,
  getReviewsByMovieController,
  updateReviewController,
  deleteReviewController
} from "../controllers/reviewController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
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

export default router;
