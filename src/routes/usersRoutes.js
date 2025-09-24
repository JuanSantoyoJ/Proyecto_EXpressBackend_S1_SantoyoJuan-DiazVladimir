// src/routes/usersRoutes.js
import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = Router();

/**
 * Registro público: fuerza rol = "usuario"
 * Para mantener el controller simple, sobreescribimos req.body.rol aquí.
 */
router.post("/users", (req, res, next) => {
  req.body.rol = "usuario";
  next();
}, createUserController);

// Solo admin puede ver/editar/eliminar usuarios
router.get("/users", verifyToken, checkRole(["administrador"]), getAllUsersController);
router.put("/users/:id", verifyToken, checkRole(["administrador"]), updateUserController);
router.delete("/users/:id", verifyToken, checkRole(["administrador"]), deleteUserController);

// Crea administrador
router.post("/users/admin", checkRole(["administrador"]), createUserController);


export default router;
