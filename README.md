# 🏥 HealthCare RAG Chatbot - Backend (Node.js API)

![Node.js](https://img.shields.io/badge/Node.js-Runtime-339933?logo=node.js)
![Express](https://img.shields.io/badge/Express-Framework-000000?logo=express)
![Azure](https://img.shields.io/badge/Azure_SQL-Cloud_DB-0078D4?style=flat&logo=microsoftazure&logoColor=white)

Este repositorio contiene el **Servidor de Lógica de Negocio** del sistema. Desarrollado en Node.js, actúa como orquestador central gestionando la autenticación de usuarios, la comunicación con el motor de IA y la persistencia de datos escalable en **Microsoft Azure**.

## ⚙️ Arquitectura y Funcionalidades

* **🔗 API Gateway para IA:** Integra un cliente interno (`fastapiClient.js`) que redirige las preguntas complejas al microservicio de IA.
* **🔐 Seguridad:** Sistema de autenticación robusto con validación de JWT en middleware (`auth.js`).
* **☁️ Base de Datos en la Nube:** Persistencia de datos segura y de alta disponibilidad alojada en **Azure SQL Database**, con estructura definida en `schema.sql`.
* **💬 Gestión de Conversaciones:** Controladores dedicados para crear, listar y recuperar historiales de chat y conversaciones.
* **🚀 Arquitectura Modular:** Separación clara de responsabilidades (Rutas, Controladores, Servicios).

## 🛠️ Stack Tecnológico

* **Entorno:** Node.js
* **Framework:** Express.js
* **Infraestructura de Datos:** Azure SQL Database
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
│   │   └── schema.sql         # Definición de tablas (Azure SQL)
│   ├── middlewares/
│   │   └── auth.js            # Protección de rutas (JWT)
│   ├── routes/                # Definición de endpoints API
│   │   ├── authRoutes.js
│   │   ├── chatRoutes.js
│   │   └── conversationRoutes.js
│   ├── services/              # Lógica externa y conexión a datos
│   │   ├── db.js              # Conexión a Azure SQL
│   │   └── fastapiClient.js   # Cliente para conectar con el Backend de IA
│   └── index.js               # Punto de entrada del servidor
├── .env                       # Variables de entorno
└── package.json
