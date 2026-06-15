# 📋 Mini Gestor Kanban

Un gestor de tareas Full-Stack moderno e interactivo, diseñado para la organización visual de proyectos mediante la metodología Kanban. Esta aplicación permite crear, editar, mover (Drag & Drop) y administrar tareas, con persistencia de datos y la capacidad de exportar reportes a Excel. 

El proyecto está completamente contenerizado y configurado con un pipeline de integración continua para su despliegue automatizado en la nube.

## 🚀 Tecnologías y Arquitectura

**Frontend (Interfaz de Usuario):**
* **React + Vite:** Construcción de UI rápida y modular.
* **Axios:** Cliente HTTP para la comunicación con la API.
* **ExcelJS & File-Saver:** Generación y descarga de reportes XLSX desde el navegador.
* **React-Toastify:** Notificaciones visuales de éxito y error.
* **CSS Modules:** Estilos encapsulados por componente.

**Backend (API RESTful):**
* **Node.js + Express:** Servidor web y enrutamiento.
* **SQLite3:** Base de datos relacional ligera implementada con consultas parametrizadas para prevenir inyecciones SQL.
* **Zod:** Validación estricta de esquemas de datos en los endpoints.
* **CORS:** Gestión segura de recursos de origen cruzado.

**DevOps & Despliegue (Nube):**
* **Docker:** Creación de imágenes y aislamiento del entorno de ejecución.
* **GitHub Actions:** Pipeline CI/CD que compila el frontend, construye la imagen de Docker y la envía a Docker Hub automáticamente en cada push a la rama principal.
* **AWS EC2 (Ubuntu):** Servidor de producción en Amazon Web Services, utilizando volúmenes de Docker para asegurar la persistencia física del archivo `.sqlite`.

## ⚙️ Estructura del Proyecto

La aplicación sigue un modelo de arquitectura limpia separando las responsabilidades:
* `/src/components` y `/src/containers`: Lógica de presentación y estado de React.
* `/src/server/server.js`: Punto de entrada de la aplicación Express y configuración de estáticos.
* `/src/routes` y `/src/controllers`: Definición de endpoints REST y lógica de negocio.
* `/src/database`: Instanciación y definición de las tablas SQL.
