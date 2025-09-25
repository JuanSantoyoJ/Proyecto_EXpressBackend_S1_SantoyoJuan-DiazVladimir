import { body, param } from "express-validator";

/* ------------------------------
   Validación: Crear Película
-------------------------------*/
export const validarCrearPelicula = [
  body("nombre")
    .notEmpty().withMessage("El nombre de la película es obligatorio"),
  body("categoriaId")
    .notEmpty().withMessage("La categoría es obligatoria")
    .isMongoId().withMessage("El ID de categoría debe ser válido"),
  body("portada")
    .optional()
    .isURL().withMessage("La portada debe ser una URL válida"),
  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser texto")
];

/* ------------------------------
   Validación: Actualizar Película
-------------------------------*/
export const validarActualizarPelicula = [
  body("nombre")
    .optional()
    .notEmpty().withMessage("El nombre no puede estar vacío"),
  body("categoriaId")
    .optional()
    .isMongoId().withMessage("El ID de categoría debe ser válido"),
  body("portada")
    .optional()
    .isURL().withMessage("La portada debe ser una URL válida"),
  body("descripcion")
    .optional()
    .isString().withMessage("La descripción debe ser texto")
];

/* ------------------------------
   Validación: Eliminar Película (ID en params)
-------------------------------*/
export const validarEliminarPelicula = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID debe ser válido")
];
