import { getDB } from "../db.js";
import { ObjectId } from "mongodb";

/* ----------------------------------
   1. Crear Reseña
---------------------------------- */
export async function createReviewController(req, res) {
  try {
    const { peliculaId, titulo, comentario, calificacion } = req.body;
    const usuarioId = req.user?.id; // del JWT

    if (!peliculaId || !titulo?.trim() || !comentario?.trim() || calificacion === undefined) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const db = getDB();

    // Verificar si la película existe
    const pelicula = await db.collection("peliculas").findOne({ _id: new ObjectId(peliculaId) });
    if (!pelicula) {
      return res.status(404).json({ error: "Película no encontrada" });
    }

    // Crear reseña
    const nuevaResena = {
      peliculaId: new ObjectId(peliculaId),
      usuarioId: new ObjectId(usuarioId),
      titulo: titulo.trim(),
      comentario: comentario.trim(),
      calificacion: Number(calificacion),
      createdAt: new Date()
    };

    const { insertedId } = await db.collection("reseñas").insertOne(nuevaResena);

    res.status(201).json({ _id: insertedId, ...nuevaResena });

  } catch (error) {
    console.error("Error en createReviewController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

/* ----------------------------------
   2. Obtener reseñas por película
---------------------------------- */
// ✅ Obtener reseñas de una película con promedio y likes/dislikes
export async function getReviewsByMovieController(req, res) {
  try {
    const { peliculaId } = req.params;
    const db = getDB();

    // Traer todas las reseñas de la película
    const reseñas = await db.collection("reseñas")
      .find({ peliculaId: new ObjectId(peliculaId) })
      .toArray();

    if (reseñas.length === 0) {
      return res.status(404).json({ error: "No hay reseñas para esta película" });
    }

    // Calcular promedio de calificación
    const promedio = reseñas.reduce((acc, r) => acc + (r.calificacion || 0), 0) / reseñas.length;

    // Asegurarnos de que likes/dislikes existan y contar
    const reseñasConLikes = reseñas.map(r => ({
      ...r,
      likes: r.likes?.length || 0,
      dislikes: r.dislikes?.length || 0
    }));

    // Respuesta con reseñas y estadísticas
    res.json({
      totalReseñas: reseñas.length,
      promedioCalificacion: promedio.toFixed(1),
      reseñas: reseñasConLikes
    });

  } catch (error) {
    console.error("Error en getReviewsByMovieController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


/* ----------------------------------
   3. Actualizar reseña
---------------------------------- */
export async function updateReviewController(req, res) {
  try {
    const { id } = req.params;
    const { titulo, comentario, calificacion } = req.body;
    const usuarioId = req.user?.id; // del JWT
    const db = getDB();

    const reseña = await db.collection("reseñas").findOne({ _id: new ObjectId(id) });
    if (!reseña) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    if (reseña.usuarioId.toString() !== usuarioId) {
      return res.status(403).json({ error: "No puedes editar esta reseña" });
    }

    const camposActualizar = {};
    if (titulo) camposActualizar.titulo = titulo;
    if (comentario) camposActualizar.comentario = comentario;
    if (calificacion !== undefined) camposActualizar.calificacion = Number(calificacion);

    await db.collection("reseñas").updateOne(
      { _id: new ObjectId(id) },
      { $set: camposActualizar }
    );

    res.json({ message: "Reseña actualizada correctamente" });

  } catch (error) {
    console.error("Error en updateReviewController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

/* ----------------------------------
   4. Eliminar reseña
---------------------------------- */
export async function deleteReviewController(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = req.user?.id; // del JWT
    const db = getDB();

    const reseña = await db.collection("reseñas").findOne({ _id: new ObjectId(id) });
    if (!reseña) {
      return res.status(404).json({ error: "Reseña no encontrada" });
    }

    if (reseña.usuarioId.toString() !== usuarioId && req.user.rol !== "administrador") {
      return res.status(403).json({ error: "No puedes eliminar esta reseña" });
    }


    await db.collection("reseñas").deleteOne({ _id: new ObjectId(id) });

    res.json({ message: "Reseña eliminada correctamente" });

  } catch (error) {
    console.error("Error en deleteReviewController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// 🔹 Like reseña
export async function likeReviewController(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = new ObjectId(req.user.id);
    const db = getDB();

    const reseña = await db.collection("reseñas").findOne({ _id: new ObjectId(id) });
    if (!reseña) return res.status(404).json({ error: "Reseña no encontrada" });

    // Inicializar arrays si no existen
    reseña.likes = reseña.likes || [];
    reseña.dislikes = reseña.dislikes || [];

    // Si ya tenía dislike, lo quitamos
    reseña.dislikes = reseña.dislikes.filter(uid => uid.toString() !== usuarioId.toString());

    // Si ya tenía like, quitamos el like (toggle)
    if (reseña.likes.some(uid => uid.toString() === usuarioId.toString())) {
      reseña.likes = reseña.likes.filter(uid => uid.toString() !== usuarioId.toString());
    } else {
      reseña.likes.push(usuarioId);
    }

    await db.collection("reseñas").updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: reseña.likes, dislikes: reseña.dislikes } }
    );

    res.json({ message: "Like actualizado", likes: reseña.likes.length, dislikes: reseña.dislikes.length });
  } catch (error) {
    console.error("Error en likeReviewController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// 🔹 Dislike reseña
export async function dislikeReviewController(req, res) {
  try {
    const { id } = req.params;
    const usuarioId = new ObjectId(req.user.id);
    const db = getDB();

    const reseña = await db.collection("reseñas").findOne({ _id: new ObjectId(id) });
    if (!reseña) return res.status(404).json({ error: "Reseña no encontrada" });

    reseña.likes = reseña.likes || [];
    reseña.dislikes = reseña.dislikes || [];

    // Si ya tenía like, lo quitamos
    reseña.likes = reseña.likes.filter(uid => uid.toString() !== usuarioId.toString());

    // Si ya tenía dislike, quitamos el dislike (toggle)
    if (reseña.dislikes.some(uid => uid.toString() === usuarioId.toString())) {
      reseña.dislikes = reseña.dislikes.filter(uid => uid.toString() !== usuarioId.toString());
    } else {
      reseña.dislikes.push(usuarioId);
    }

    await db.collection("reseñas").updateOne(
      { _id: new ObjectId(id) },
      { $set: { likes: reseña.likes, dislikes: reseña.dislikes } }
    );

    res.json({ message: "Dislike actualizado", likes: reseña.likes.length, dislikes: reseña.dislikes.length });
  } catch (error) {
    console.error("Error en dislikeReviewController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}


// 🔹 Obtener todas las reseñas (solo admin)
export async function getAllReviewsController(req, res) {
  try {
    const db = getDB();
    const reviews = await db.collection("reseñas").find().toArray();
    res.json(reviews);
  } catch (error) {
    console.error("Error en getAllReviewsController:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}