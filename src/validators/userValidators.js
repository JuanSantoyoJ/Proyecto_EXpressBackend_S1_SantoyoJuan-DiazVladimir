import { body, param } from "express-validator";

/* ------------------------------
   Validación: Crear Usuario
-------------------------------*/
export const validarCrearUsuario = [
    body("correo")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("El correo debe ser válido"),
    body("nombre")
        .notEmpty().withMessage("El nombre es obligatorio"),
    body("contrasena")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres"),
    body("rol")
        .optional()
        .isIn(["usuario", "administrador"]).withMessage("El rol debe ser usuario o administrador"),
    body("direccion")
        .optional()
        .isString().withMessage("La dirección debe ser texto")
];

/* ------------------------------
   Validación: Actualizar Usuario
-------------------------------*/
export const validarActualizarUsuario = [
    body("correo")
        .optional()
        .isEmail()
        .withMessage("El correo debe ser válido"),
    body("nombre")
        .optional()
        .notEmpty().withMessage("El nombre no puede estar vacío"),
    body("contrasena")
        .optional()
        .isLength({ min: 6 }).withMessage("La contraseña debe tener mínimo 6 caracteres"),
    body("rol")
        .optional()
        .isIn(["usuario", "administrador"]).withMessage("El rol debe ser usuario o administrador"),
    body("direccion")
        .optional()
        .isString().withMessage("La dirección debe ser texto")
];

/* ------------------------------
   Validación: Login Usuario
-------------------------------*/
export const validarLoginUsuario = [
    body("correo")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("El correo debe ser válido"),
    body("contrasena")
        .notEmpty().withMessage("La contraseña es obligatoria")
];

/* ------------------------------
   Validación: Eliminar Usuario (ID en params)
-------------------------------*/
export const validarEliminarUsuario = [
    param("id")
        .notEmpty().withMessage("El ID es obligatorio")
        .isMongoId().withMessage("El ID debe ser válido")
];
