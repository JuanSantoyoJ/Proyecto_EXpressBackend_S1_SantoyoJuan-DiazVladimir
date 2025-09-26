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

    // URL absoluta para producción
    const swaggerURL = process.env.NODE_ENV === "production"
        ? "https://proyecto-ex-press-backend-s1-santoyo-juan-diaz-vladi-apot6vzau.vercel.app/swagger.json"
        : "/swagger.json";

    // Servimos Swagger UI
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

    console.log(`📄 Documentación en /api-docs`);
}
