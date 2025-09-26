import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
    const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
    const swaggerDocument = YAML.load(swaggerPath);

    // Sirve el JSON directamente
    app.get("/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerDocument);
    });

    // Sirve la interfaz de Swagger
    app.use(
        "/api-docs/",
        swaggerUi.serve,
        swaggerUi.setup(swaggerDocument, {
            explorer: true,
            swaggerOptions: {
                url: "/swagger.json", // Usa el JSON local para evitar problemas
                persistAuthorization: true
            },
            customSiteTitle: "KarenFlix API Docs",
        })
    );

    console.log(`📄 Swagger disponible en /api-docs`);
}
