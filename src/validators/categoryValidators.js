import { body, param } from "express-validator";

/* ------------------------------
   Validación: Crear Categoría
-------------------------------*/
export const validarCrearCategoria = [
  body("nombre")
    .notEmpty().withMessage("El nombre de la categoría es obligatorio"),
  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser texto")
];

/* ------------------------------
   Validación: Actualizar Categoría
-------------------------------*/
export const validarActualizarCategoria = [
  body("nombre")
    .optional()
    .notEmpty().withMessage("El nombre no puede estar vacío"),
  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser texto")
];

/* ------------------------------
   Validación: Eliminar Categoría (ID en params)
-------------------------------*/
export const validarEliminarCategoria = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID debe ser válido")
];
