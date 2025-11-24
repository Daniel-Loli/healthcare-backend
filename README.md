# 🏥 HealthCare RAG Chatbot - Backend (Node.js API)

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-Framework-000000?logo=express)
![SQL](https://img.shields.io/badge/Database-SQL-CC2927?logo=database)

Este repositorio contiene el **Servidor de Lógica de Negocio** del sistema. Desarrollado en Node.js, actúa como orquestador central gestionando la autenticación de usuarios, la persistencia de datos y la comunicación con el motor de Inteligencia Artificial.

## ⚙️ Arquitectura y Funcionalidades

* **🔗 API Gateway para IA:** Integra un cliente interno (`fastapiClient.js`) que redirige las preguntas complejas al microservicio de IA.
* **🔐 Seguridad:** Sistema de autenticación robusto con validación de JWT en middleware (`auth.js`).
* **🗄️ Base de Datos SQL:** Gestión de estructura de datos relacional definida en `schema.sql`.
* **💬 Gestión de Conversaciones:** Controladores dedicados para crear, listar y recuperar historiales de chat y conversaciones.
* **🚀 Arquitectura Modular:** Separación clara de responsabilidades (Rutas, Controladores, Servicios).

## 🛠️ Stack Tecnológico

* **Entorno:** Node.js
* **Framework:** Express.js
* **Base de Datos:** SQL (PostgreSQL / MySQL)
* **Cliente HTTP:** Axios (para comunicación entre microservicios)
* **Seguridad:** JSON Web Tokens (JWT)

## 📂 Estructura del Proyecto

```text
healthcare-backend/
├── src/
│   ├── controllers/           # Lógica de negocio de los endpoints
│   │   ├── authController.js          # Registro y Login
│   │   ├── chatController.js          # Envío de mensajes
│   │   └── conversationController.js  # Historial de chats
│   ├── db/
│   │   └── schema.sql         # Definición de tablas de la BDD
│   ├── middlewares/
│   │   └── auth.js            # Protección de rutas (JWT)
│   ├── routes/                # Definición de endpoints API
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   └── conversationRoutes.js
│   ├── services/              # Lógica externa y conexión a datos
│   │   ├── db.js              # Configuración de conexión a BDD
│   │   └── fastapiClient.js   # Cliente para conectar con el Backend de IA
│   └── index.js               # Punto de entrada del servidor
├── .env                       # Variables de entorno
└── package.json
