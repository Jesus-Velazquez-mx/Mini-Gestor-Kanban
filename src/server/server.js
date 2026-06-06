import express from 'express';
import cors from 'cors';
import db from '../database/database.js';

/* Crear instancia de la aplicación Express */
const app = express();
const PORT = 3000;

/* Permitir solicitudes desde cualquier origen (CORS) */
app.use(cors());
/* Retornar JSON en las respuestas */
app.use(express.json());

/* listen(port: number, [callback]*/
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

/* Rutas para manejar las tareas */