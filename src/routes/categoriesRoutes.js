// src/routes/categoriesRoutes.js
import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/categoryController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Solo administradores pueden crear, actualizar y borrar
router.post("/categories",verifyToken, checkRole(["administrador"]), createCategoryController);
router.get("/categories", getAllCategoriesController);
router.put("/categories/:id",verifyToken, checkRole(["administrador"]), updateCategoryController);
router.delete("/categories/:id",verifyToken, checkRole(["administrador"]), deleteCategoryController);

export default router;
    