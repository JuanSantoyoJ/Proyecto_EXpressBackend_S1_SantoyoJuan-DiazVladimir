import { Router } from "express";
import {
  createUserController,
  getAllUsersController,
  updateUserController,
  deleteUserController
} from "../controllers/userController.js";
import { checkRole } from "../middlewares/roleMiddleware.js";

const router = Router();

router.post("/users", createUserController);
router.get("/users", getAllUsersController);
router.put("/users/:id", updateUserController);

// Solo admins pueden eliminar
router.delete("/users/:id", checkRole(["administrador"]), deleteUserController);

export default router;
