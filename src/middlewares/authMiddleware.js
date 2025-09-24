import jwt from "jsonwebtoken";
const SECRET_KEY = process.env.SECRET_KEY;

export function verifyToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // "Bearer TOKEN"

    if (!token) return res.status(401).json({ error: "Token no proporcionado" });

    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) return res.status(403).json({ error: "Token inválido o expirado" });

        req.user = user; // Guardamos datos del usuario en la request
        next();
    });
}