import express from "express";
import { loginController } from "../controllers/authController.js";
import { validarLoginUsuario } from "../validators/userValidators.js";
import { validarCampos } from "../middlewares/validationMiddleware.js";

const router = express.Router();

// Login
router.post("/auth/login", validarLoginUsuario, validarCampos, loginController);

export default router;
