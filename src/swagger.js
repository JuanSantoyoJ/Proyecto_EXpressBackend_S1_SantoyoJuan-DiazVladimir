import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
    const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    // Endpoint para servir el JSON directamente
    app.get("/swagger.json", (req, res) => {
        res.json(swaggerDocument);
    });

    // Interfaz de Swagger UI
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            swaggerOptions: {
                persistAuthorization: true,
                url: "/swagger.json", // 👈 Forzamos a usar nuestro endpoint en producción
            },
            customSiteTitle: "KarenFlix API Docs",
        })
    );

    console.log(`📄 Documentación en http://localhost:3000/api-docs`);
}
