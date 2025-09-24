// src/routes/moviesRoutes.js
import { Router } from "express";
import {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController
} from "../controllers/movieController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Solo admins pueden crear, actualizar y borrar
router.post("/movies",verifyToken, checkRole(["administrador"]), createMovieController);
router.get("/movies", getAllMoviesController);
router.put("/movies/:id",verifyToken, checkRole(["administrador"]), updateMovieController);
router.delete("/movies/:id",verifyToken, checkRole(["administrador"]), deleteMovieController);

export default router;
