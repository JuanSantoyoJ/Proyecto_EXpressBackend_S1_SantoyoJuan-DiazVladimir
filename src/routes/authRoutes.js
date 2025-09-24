// src/routes/authRoutes.js
import { Router } from "express";
import { loginController } from "../controllers/authController.js";

const router = Router();

// Público: devuelve { token }
router.post("/auth/login", loginController);

export default router;