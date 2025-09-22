<h3 align="center";>
<b>KarenFlix</b>
</h3>

<br>
<br>
<br>

<h3 align="center";>

**Juan Santoyo**

</h3>

<h3 align="center";>

**Vladimir Diaz**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**S1**

</h3>

<h3 align="center";>

**Pedro Felipe Gómez Bonilla**

</h3>

<br>
<br>
<br>
<br>

<h3 align="center";>

**CAMPUSLANDS**

</h3>

<h3 align="center";>

**RUTA NODE**

</h3>

<h3 align="center";>

**BUCARAMANGA, SANTANDER**

</h3>

<h3 align="center";>

**2025**

</h3>

---
# KarenFlix

## Objetivo

El objetivo de este proyecto es desarrollar una aplicación full-stack usando **Node.js** + **Express** para el backend y **HTML** + **CSS** puro para el frontend, que permita a los usuarios registrar, calificar y rankear películas, animes y series geek. Esta herramienta debe incluir funcionalidades para gestionar usuarios, reseñas, categorías y rankings, diferenciando permisos de usuario y administrador. Además, debe contar con autenticación segura, validaciones robustas y un frontend que consuma la API desarrollada.

## Funcionalidades Requeridas

### Gestión de Usuarios

- **Registro de Usuarios:** Los nuevos usuarios deben poder registrarse en la aplicación.
- **Autenticación:** El sistema debe permitir el inicio de sesión para acceder a funcionalidades protegidas.
- **Perfiles de Usuario:** Cada usuario debe tener un perfil para gestionar sus reseñas y datos.

### Catálogo de Contenido

- **Gestión de Películas/Animes/Series:** CRUD completo para administradores.
- **Búsqueda y Filtros:** Funcionalidades para buscar contenido por título, categoría, año, etc.
- **Clasificación por Categorías:** Las películas deben estar organizadas en categorías (ciencia ficción, terror, etc.).

### Sistema de Calificación y Reseñas

- **Creación de Reseñas:** Los usuarios autenticados deben poder escribir reseñas y calificar contenido.
- **Valoración:** Los usuarios deben poder calificar el contenido con un sistema de puntuación.
- **Comentarios:** Un sistema para que los usuarios puedan comentar en las reseñas.

### Rankings

- **Generación Automática:** Crear rankings basados en las calificaciones de los usuarios.
- **Visualización:** Mostrar los rankings por categoría o globalmente.

### Seguridad y Permisos

- **Roles de Usuario:** El sistema debe distinguir entre usuarios normales y administradores, con permisos de acceso diferenciados.
- **Autenticación y Autorización:** Usar tokens JWT para proteger las rutas del API.

## Consideraciones Técnicas

### Backend

- **Desarrollado en Node.js** con **Express**.

### Autenticación

- JWT con **passport-jwt**, **jsonwebtoken** y **bcrypt** para la gestión segura de contraseñas.

### Variables de Entorno

- Uso de **dotenv**.

### Control de Peticiones

- **express-rate-limit** para evitar abusos.

### Validaciones

- **express-validator** para validar los datos en los endpoints.

### Base de Datos

- **MongoDB** utilizando el driver oficial.

### Documentación de API

- **swagger-ui-express**.

### Frontend

- **HTML**, **CSS** y **JavaScript** puro.

### Arquitectura

- Organización del código en directorios como `/models`, `/controllers`, `/routes`, etc.

---

## 📚 Caso de Estudio: KarenFlix

### 1. Contexto
El entretenimiento digital es una de las industrias con mayor crecimiento en los últimos años. Plataformas como Netflix, Crunchyroll y Disney+ dominan el mercado del streaming, ofreciendo a los usuarios una amplia variedad de películas, series y animes. Sin embargo, la mayoría de estas plataformas carecen de herramientas abiertas que permitan a los usuarios **gestionar sus propias reseñas, rankings personalizados y comentarios comunitarios** en un solo lugar.

**KarenFlix** nace como una propuesta académica dentro de la **Ruta Node en Campuslands**, con el objetivo de crear una aplicación full-stack que combine la **gestión de contenidos** con la **interacción del usuario**, asegurando autenticación segura, permisos diferenciados y un frontend funcional.

---

### 2. Problema
Actualmente, los usuarios que desean:
- Calificar películas, series y animes,
- Escribir reseñas y compartir opiniones,
- Consultar rankings personalizados,

deben usar múltiples plataformas o redes sociales sin una integración centralizada.  
Esto **fragmenta la experiencia** y **limita la visibilidad de las opiniones** en un solo ecosistema.

---

### 3. Objetivo del Proyecto
Diseñar y desarrollar una aplicación web **full-stack** que permita:  
- Registro e inicio de sesión de usuarios.  
- CRUD completo para administradores sobre películas, series y animes.  
- Reseñas, calificaciones y comentarios en tiempo real.  
- Generación automática de **rankings globales y por categoría**.  
- Interfaz amigable usando **HTML, CSS y JavaScript** puro.  
- Backend seguro con **Node.js, Express, MongoDB y JWT**.  

---

### 4. Alcance
El proyecto incluirá:  
- **Módulo de autenticación** con roles: usuario y administrador.  
- **API REST** documentada con Swagger.  
- **Sistema de reseñas y rankings** con calificaciones numéricas.  
- **Búsquedas y filtros** por título, año y categoría.  
- **Frontend responsive** que consuma la API mediante Fetch API.  

Quedan fuera del alcance:
- Integraciones con servicios externos de streaming.  
- Aplicaciones móviles nativas (solo versión web).  

---

### 5. Tecnologías Clave
- **Backend:** Node.js, Express, MongoDB, JWT, bcrypt, express-validator.  
- **Frontend:** HTML5, CSS3, JavaScript (ES6+).  
- **Seguridad:** Passport-JWT, express-rate-limit, Helmet.  
- **Documentación:** Swagger-UI-Express.  

---

### 6. Beneficios Esperados
- Plataforma abierta y extensible para la comunidad geek.  
- Aprendizaje práctico de **arquitectura full-stack** y **autenticación segura**.  
- Base para futuros proyectos con funcionalidades avanzadas como recomendaciones o integración con APIs externas.  

---

### 7. Conclusión
**KarenFlix** será una herramienta que no solo reforzará los conocimientos de **desarrollo web full-stack** del equipo, sino que también ofrecerá a los usuarios una plataforma completa para la gestión y evaluación de contenido audiovisual en un entorno seguro y bien estructurado.

---

## ⚙️ Requisitos del Sistema

Antes de instalar **KarenFlix**, asegúrate de tener lo siguiente:

- **Sistema Operativo:** Windows 10+, macOS o cualquier distribución Linux moderna.
- **Node.js:** v18 o superior → [Descargar Node.js](https://nodejs.org/)
- **npm:** v9 o superior (se instala junto con Node.js).
- **MongoDB:** v6 o superior → [Descargar MongoDB](https://www.mongodb.com/try/download/community)
- **Navegador:** Chrome, Firefox o Edge (última versión).
- **Editor de Código:** VS Code o tu preferido → [Visual Studio Code](https://code.visualstudio.com/)

Opcional para desarrollo:
- **Postman o Insomnia** para probar la API.
- **Git** para clonar el repositorio → [Descargar Git](https://git-scm.com/)

---

## 🛠 Instalación y Configuración

Sigue estos pasos para instalar y configurar el proyecto en tu máquina local:

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/KarenFlix.git
cd KarenFlix

2. Instalar Dependencias

Instala todas las dependencias necesarias con:

npm install

3. Configurar Variables de Entorno

Crea un archivo .env en la raíz del proyecto con el siguiente contenido:

PORT=3000
MONGO_URI=mongodb://localhost:27017/karenflix
JWT_SECRET=supersecreto_cambiar
JWT_EXPIRES_IN=1d
CORS_ORIGIN=http://localhost:3000
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX=100


Nota:

MONGO_URI debe apuntar a tu instancia de MongoDB local o en la nube (MongoDB Atlas).

JWT_SECRET debe ser una cadena segura.

4. Iniciar Servidor en Modo Desarrollo

Para iniciar el servidor backend con nodemon (si está instalado):

npm run dev


Si no, puedes usar:

node src/server.js

5. Acceder a la Aplicación

Backend/API: http://localhost:3000

Frontend (HTML/CSS/JS): Se servirá desde la carpeta /public