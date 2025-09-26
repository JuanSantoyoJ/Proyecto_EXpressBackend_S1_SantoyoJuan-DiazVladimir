import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
    const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    // Endpoint para JSON
    app.get("/swagger.json", (req, res) => {
        res.json(swaggerDocument);
    });

    // UI de Swagger
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(null, {
            swaggerOptions: {
                url: "/swagger.json",
                persistAuthorization: true
            },
            customSiteTitle: "KarenFlix API Docs"
        })
    );

    console.log("📄 Documentación en /api-docs");
}
