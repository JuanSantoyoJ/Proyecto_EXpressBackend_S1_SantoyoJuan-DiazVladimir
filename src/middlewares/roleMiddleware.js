export function checkRole(rolesPermitidos) {
    return (req, res, next) => {
        try {
            // Si en el futuro usamos JWT, aquí extraeríamos el usuario autenticado
            // Por ahora, simulamos que el rol viene en el body o query (para pruebas)
            const rol = req.body.rol || req.query.rol;

            if (!rol) {
                return res.status(401).json({ error: "Rol no especificado" });
            }

            if (!rolesPermitidos.includes(rol)) {
                return res.status(403).json({ error: "Acceso denegado" });
            }

            next(); // Si el rol está permitido, sigue a la ruta
        } catch (error) {
            return res.status(500).json({ error: "Error en el middleware de rol" });
        }
    };
}
