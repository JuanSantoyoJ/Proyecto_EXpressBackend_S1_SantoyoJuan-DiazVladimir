import { createUser, getAllUsers, updateUser, deleteUser } from "../models/userModel.js";

// 🔹 Crear usuarios
export async function createUserController(req, res) {
    try {
        const { correo, nombre, direccion, rol, contrasena } = req.body;

        // ✅ Validación de datos obligatorios
        if (!correo || !nombre || !contrasena) {
            return res.status(400).json({
                error: "Correo, nombre y contraseña son requeridos"
            });
        }

        // ✅ Llamar al modelo para crear usuario
        const user = await createUser({ correo, nombre, direccion, rol, contrasena });
        return res.status(201).json(user);

    } catch (error) {
        if (error.message === "El correo ya está registrado" || error.message.includes("Rol inválido")) {
            return res.status(400).json({ error: error.message });
        }
        console.error("Error en createUserController:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


// 🔹 Obtener todos los usuarios
export async function getAllUsersController(req, res) {
    try {
        const users = await getAllUsers();
        return res.json(users);
    } catch (error) {
        console.error("Error en getAllUsersController:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}

// 🔹 Actualizar usuario
export async function updateUserController(req, res) {
    try {
        const { id } = req.params;
        const { correo, nombre, direccion, rol } = req.body;

        // Solo agregamos al objeto los campos realmente enviados
        const camposActualizar = {};
        if (correo !== undefined && correo !== null && correo !== "") camposActualizar.correo = correo;
        if (nombre !== undefined && nombre !== null && nombre !== "") camposActualizar.nombre = nombre;
        if (direccion !== undefined && direccion !== null && direccion !== "") camposActualizar.direccion = direccion;
        if (rol !== undefined && rol !== null && rol !== "") camposActualizar.rol = rol;

        if (Object.keys(camposActualizar).length === 0) {
            return res.status(400).json({ error: "No hay datos para actualizar" });
        }

        const result = await updateUser(id, camposActualizar);
        return res.json(result);
    } catch (error) {
        if (error.message === "ID inválido") {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === "Usuario no encontrado") {
            return res.status(404).json({ error: error.message });
        }
        console.error("Error en updateUserController:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}


// 🔹 Eliminar usuario
export async function deleteUserController(req, res) {
    try {
        const { id } = req.params;
        const result = await deleteUser(id);
        return res.json(result);
    } catch (error) {
        if (error.message === "ID inválido") {
            return res.status(400).json({ error: error.message });
        }
        if (error.message === "Usuario no encontrado") {
            return res.status(404).json({ error: error.message });
        }
        console.error("Error en deleteUserController:", error);
        return res.status(500).json({ error: "Error interno del servidor" });
    }
}