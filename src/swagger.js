// src/swagger.js
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function swaggerDocs(app) {
  // Carga tu YAML como siempre
  const swaggerPath = path.join(__dirname, "docs", "swagger.yaml");
  const swaggerDocument = YAML.load(swaggerPath);

  // Endpoint JSON que consumirá la UI
  app.get("/swagger.json", (req, res) => {
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.status(200).json(swaggerDocument);
  });

  // UI servida con assets desde CDN (evita problemas de estáticos en Vercel)
  app.get("/api-docs", (_req, res) => {
    // Puedes cambiar la versión @5 si quieres fijarla (ej: @5.17.14)
    const cdn = "https://unpkg.com/swagger-ui-dist@5";
    const html = `<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <title>KarenFlix API Docs</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="stylesheet" href="${cdn}/swagger-ui.css" />
  <style>
    html, body { height: 100%; margin: 0; background: #fff; }
    #swagger-ui { height: 100%; }
  </style>
</head>
<body>
  <div id="swagger-ui"></div>
  <script src="${cdn}/swagger-ui-bundle.js"></script>
  <script src="${cdn}/swagger-ui-standalone-preset.js"></script>
  <script>
    window.onload = () => {
      window.ui = SwaggerUIBundle({
        url: "/swagger.json",
        dom_id: "#swagger-ui",
        deepLinking: true,
        presets: [SwaggerUIBundle.presets.apis, SwaggerUIStandalonePreset],
        layout: "BaseLayout",
        persistAuthorization: true
      });
    };
  </script>
</body>
</html>`;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.status(200).send(html);
  });

  console.log("📄 Documentación: /api-docs  (usando CDN)");
}
