import { body, param } from "express-validator";

/* ------------------------------
   Validación: Crear Reseña
-------------------------------*/
export const validarCrearResena = [
  body("peliculaId")
    .notEmpty().withMessage("El ID de la película es obligatorio")
    .isMongoId().withMessage("El ID de la película debe ser válido"),
  body("titulo")
    .notEmpty().withMessage("El título de la reseña es obligatorio"),
  body("comentario")
    .notEmpty().withMessage("El comentario es obligatorio"),
  body("calificacion")
    .notEmpty().withMessage("La calificación es obligatoria")
    .isFloat({ min: 1, max: 5 }).withMessage("La calificación debe estar entre 1 y 5")
];

/* ------------------------------
   Validación: Actualizar Reseña
-------------------------------*/
export const validarActualizarResena = [
  body("titulo")
    .optional()
    .notEmpty().withMessage("El título no puede estar vacío"),
  body("comentario")
    .optional()
    .notEmpty().withMessage("El comentario no puede estar vacío"),
  body("calificacion")
    .optional()
    .isFloat({ min: 1, max: 5 }).withMessage("La calificación debe estar entre 1 y 5")
];

/* ------------------------------
   Validación: Eliminar Reseña (ID en params)
-------------------------------*/
export const validarEliminarResena = [
  param("id")
    .notEmpty().withMessage("El ID es obligatorio")
    .isMongoId().withMessage("El ID debe ser válido")
];
