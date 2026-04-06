# Plataforma de Formación - Fercave Asesores S.L.

Sistema de gestión y visualización de cursos de formación interna. Esta plataforma permite a los empleados acceder a contenidos educativos específicos según sus permisos, con una experiencia de usuario fluida y segura.

---

## Características Principales

* **Autenticación Segura:** Gestión de usuarios mediante **Firebase Auth**.
* **Acceso Granular:** Los cursos se cargan dinámicamente desde **Firestore** basándose en un array de permisos (`cursosPermitidos`) único para cada usuario.
* **Arquitectura Modular (ES6):** Organización del código mediante `import/export`, separando la lógica de Firebase, las utilidades del DOM y la protección de rutas.
* **Interfaz Dinámica:** * Carga asíncrona de tarjetas de cursos con estados de "Cargando...".
    * Visualizador de cursos con inyección de vídeos y materiales.
    * Sistema de modales para infografías y materiales didácticos.
* **Diseño Profesional:** Estilos desarrollados con **SASS**, siguiendo una línea visual corporativa y totalmente *responsive*.

---

## Tecnologías Utilizadas

| Tecnología | Uso |
| :--- | :--- |
| **HTML5** | Estructura semántica de la plataforma. |
| **SASS / CSS3** | Estilos avanzados, variables y diseño responsive. |
| **JavaScript (ES6+)** | Lógica de negocio y manipulación del DOM mediante módulos. |
| **Firebase Auth** | Control de acceso y sesiones de usuario. |
| **Cloud Firestore** | Base de Datos NoSQL para permisos y contenido de cursos. |
| **Font Awesome 6** | Iconografía e indicadores visuales. |

---

## Estructura del Proyecto

```text
/
├── index.html                  # Dashboard principal de cursos
├── login.html                  # Pantalla de inicio de sesión
├── curso.html                  # Visor de lecciones y vídeos
├── public/
│   ├── css/
│   │   └── main.css            # Estilos finales compilados
│   ├── js/
│   │   ├── firebase-config.js  # Configuración inicial de Firebase
│   │   ├── auth-guard.js       # Middleware para proteger páginas
│   │   ├── utils.js            # Funciones compartidas (Footer, Scroll, Modales)
│   │   ├── index.js            # Lógica del listado de cursos
│   │   ├── login.js            # Gestión de acceso y validación
│   │   └── carga-curso.js      # Renderizado dinámico del contenido
│   └── images/                 # Archivos visuales y portadas
└── README.md                   # Documentación del proyecto