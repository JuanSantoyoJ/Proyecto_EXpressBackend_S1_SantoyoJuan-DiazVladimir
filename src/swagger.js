import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
    const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    // 🚀 La interfaz de Swagger carga sin bloqueo
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            swaggerOptions: {
                persistAuthorization: true, // Mantiene el token cuando recargas
            },
            customSiteTitle: "KarenFlix API Docs",
            customfavIcon: "https://swagger.io/favicon-32x32.png",
        })
    );

    console.log("📄 Documentación disponible en http://localhost:3000/api-docs");
    console.log("📄 Documentación disponible en /api-docs");
}
