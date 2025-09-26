// src/swagger.js
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
  const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
  const spec = YAML.load(swaggerPath);

  // Sirve el JSON para la UI
  app.get("/swagger.json", (_req, res) => res.json(spec));

  // Fuerza el trailing slash para que los assets carguen bien en serverless
  app.get("/api-docs", (_req, res) => res.redirect(302, "/api-docs/"));

  // Monta Swagger UI usando SOLO url (no pases spec aquí)
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(null, {
      swaggerOptions: {
        url: "/swagger.json",
        persistAuthorization: true,
      },
      customSiteTitle: "KarenFlix API Docs",
    })
  );

  console.log("📄 Swagger listo en /api-docs");
}
