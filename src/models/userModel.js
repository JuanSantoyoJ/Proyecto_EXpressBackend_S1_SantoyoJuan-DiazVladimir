import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";
import { getDB } from "../db.js";

// 🔹 Crear usuario
export async function createUser({ correo, nombre, direccion = "", rol = "usuario", contraseña }) {
    const db = getDB();

    // Validar roles permitidos
    const rolesPermitidos = ["usuario", "administrador"];
    if (!rolesPermitidos.includes(rol)) {
        throw new Error("Rol inválido. Solo 'usuario' o 'administrador'");
    }

    // Verificar si el correo ya existe
    const existingUser = await db.collection("usuarios").findOne({ correo });
    if (existingUser) {
        throw new Error("El correo ya está registrado");
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    const doc = { correo, nombre, direccion, rol, contraseña: hashedPassword, createdAt: new Date() };
    const { insertedId } = await db.collection("usuarios").insertOne(doc);
    return { _id: insertedId, correo, nombre, direccion, rol, createdAt: doc.createdAt };
}


// 🔹 Obtener todos los usuarios
export async function getAllUsers() {
    const db = getDB();
    return await db.collection("usuarios").find().toArray();
}

// 🔹 Actualizar usuario por ID
export async function updateUser(id, { correo, nombre, direccion }) {
    const db = getDB();

    // Validar ID
    if (!ObjectId.isValid(id)) {
        throw new Error("ID inválido");
    }

    const result = await db.collection("usuarios").updateOne(
        { _id: new ObjectId(id) },
        { $set: { correo, nombre, direccion } }
    );

    if (result.matchedCount === 0) {
        throw new Error("Usuario no encontrado");
    }

    return { message: "Usuario actualizado correctamente" };
}


// 🔹 Eliminar usuario por ID
export async function deleteUser(id) {
    const db = getDB();

    // Validar ID
    if (!ObjectId.isValid(id)) {
        throw new Error("ID inválido");
    }

    const result = await db.collection("usuarios").deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
        throw new Error("Usuario no encontrado");
    }

    return { message: "Usuario eliminado correctamente" };
}