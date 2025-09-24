export function checkRole(rolesPermitidos) {
    return (req, res, next) => {
        try {
            // Ahora el rol viene del token: req.user lo pone verifyToken
            const rol = req.user?.rol;

            if (!rol) {
                return res.status(401).json({ error: "Usuario no autenticado" });
            }

            if (!rolesPermitidos.includes(rol)) {
                return res.status(403).json({ error: "Acceso denegado: rol insuficiente" });
            }

            next(); // Todo OK → pasa a la ruta
        } catch (error) {
            console.error("Error en checkRole:", error);
            return res.status(500).json({ error: "Error en el middleware de rol" });
        }
    };
}