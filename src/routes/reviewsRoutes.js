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

const router = Router();

// Cualquiera puede ver reseñas
router.get("/reviews/:peliculaId", getReviewsByMovieController);

// Solo usuarios autenticados pueden crear, actualizar y borrar
router.post("/reviews",verifyToken, checkRole(["usuario", "administrador"]), createReviewController);
router.put("/reviews/:id",verifyToken, checkRole(["usuario", "administrador"]), updateReviewController);
router.delete("/reviews/:id",verifyToken, checkRole(["usuario", "administrador"]), deleteReviewController);

export default router;
