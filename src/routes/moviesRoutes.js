// src/routes/moviesRoutes.js
import { Router } from "express";
import {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController,
  getMovieRankingController
} from "../controllers/movieController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { validarCampos } from "../middlewares/validationMiddleware.js";
import {
  validarCrearPelicula,
  validarActualizarPelicula,
  validarEliminarPelicula
} from "../validators/movieValidators.js";

const router = Router();

// ✅ Crear película (solo admin)
router.post(
  "/movies",
  verifyToken,
  checkRole(["administrador"]),
  validarCrearPelicula,
  validarCampos,
  createMovieController
);

// ✅ Obtener todas las películas (público)
router.get("/movies", getAllMoviesController);

// ✅ Actualizar película (solo admin)
router.put(
  "/movies/:id",
  verifyToken,
  checkRole(["administrador"]),
  validarActualizarPelicula,
  validarCampos,
  updateMovieController
);

// ✅ Eliminar película (solo admin)
router.delete(
  "/movies/:id",
  verifyToken,
  checkRole(["administrador"]),
  validarEliminarPelicula,
  validarCampos,
  deleteMovieController
);

router.get("/movies/ranking", getMovieRankingController);


export default router;