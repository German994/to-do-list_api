# To-Do List API REST

Esta es una API RESTful desarrollada con **Node.js**, **Express**, y **MongoDB** para la gestión de tareas y usuarios. Incluye funcionalidades de autenticación y autorización utilizando **JSON Web Tokens (JWT)**.

---

## Características

- **Tareas CRUD**: Crear, leer, actualizar y eliminar tareas.
- **Gestión de usuarios**: Registro, inicio de sesión.
- **Autenticación segura**: Uso de JWT para proteger rutas privadas.
- **Encriptación**: Contraseñas encriptadas con **bcrypt**.
- **Configuración segura**: Variables de entorno con **dotenv**.
- **Soporte CORS**: Integración de **cors**.

---

## Tecnologías utilizadas

- **Node.js**
- **Express**
- **MongoDB / Mongoose**
- **bcrypt**
- **jsonwebtoken**
- **dotenv**
- **cors**

---

## Requisitos previos

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

---

## Instalación

1. Clona este repositorio:

   ```
   git clone https://github.com/German994/to-do-list_api.git
   ```

2. Navega al directorio del proyecto e instala las dependencias necesarias:

   ```
   npm i
   ```

3. Ejecuta la aplicación en modo de desarrollo:

   ```
   npm run dev
   ```

4. Disponer de una cluster configurado en **MongoDB Atlas** (connection string) o de una DB local con **MongoDB Compass**
