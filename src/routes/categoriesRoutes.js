// src/routes/categoriesRoutes.js
import { Router } from "express";
import {
  createCategoryController,
  getAllCategoriesController,
  updateCategoryController,
  deleteCategoryController
} from "../controllers/categoryController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = Router();

// Solo administradores pueden crear, actualizar y borrar
router.post("/categories", checkRole(["administrador"]), createCategoryController);
router.get("/categories", getAllCategoriesController);
router.put("/categories/:id", checkRole(["administrador"]), updateCategoryController);
router.delete("/categories/:id", checkRole(["administrador"]), deleteCategoryController);

export default router;
    