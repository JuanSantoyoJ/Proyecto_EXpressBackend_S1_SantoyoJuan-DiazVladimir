import express from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/categoryController.js";

import {
  validarCrearCategoria,
  validarActualizarCategoria,
  validarEliminarCategoria
} from "../validators/categoryValidators.js";

import { validarCampos } from "../middlewares/validationMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = express.Router();

// ✅ Crear categoría (solo admin)
router.post(
  "/categories",
  verifyToken,
  checkRole(["administrador"]),
  validarCrearCategoria,
  validarCampos,
  createCategoryController
);

// ✅ Obtener todas las categorías (público)
router.get("/categories", getAllCategoriesController);

// ✅ Actualizar categoría (solo admin)
router.put(
  "/categories/:id",
  verifyToken,
  checkRole(["administrador"]),
  validarActualizarCategoria,
  validarCampos,
  updateCategoryController
);

// ✅ Eliminar categoría (solo admin)
router.delete(
  "/categories/:id",
  verifyToken,
  checkRole(["administrador"]),
  validarEliminarCategoria,
  validarCampos,
  deleteCategoryController
);

export default router;
