// src/routes/moviesRoutes.js
import { Router } from "express";
import {
  createMovieController,
  getAllMoviesController,
  updateMovieController,
  deleteMovieController
} from "../controllers/movieController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = Router();

// Solo admins pueden crear, actualizar y borrar
router.post("/movies", checkRole(["administrador"]), createMovieController);
router.get("/movies", getAllMoviesController);
router.put("/movies/:id", checkRole(["administrador"]), updateMovieController);
router.delete("/movies/:id", checkRole(["administrador"]), deleteMovieController);

export default router;
