import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
    const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    // Servimos el JSON
    app.get("/swagger.json", (req, res) => {
        res.json(swaggerDocument);
    });

    // URL para swagger.json
    const swaggerURL =
        process.env.NODE_ENV === "production"
            ? "/swagger.json"
            : "/swagger.json";

    // Swagger UI
    app.use(
        "/api-docs",
        swaggerUi.serve,
        swaggerUi.setup(null, {
            swaggerOptions: {
                url: swaggerURL,
                persistAuthorization: true
            },
            customSiteTitle: "KarenFlix API Docs",
        })
    );

    console.log("📄 Documentación en /api-docs");
}
