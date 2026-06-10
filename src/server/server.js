import express from 'express';
import cors from 'cors';
import db from '../database/database.js';
import router from '../routes/routes.js';


/* Crear instancia de la aplicación Express */
const app = express();
const PORT = 3000;

/* app.use([ruta_opcional], middleware_o_router) */
/* Un middleware es una función que se ejecuta antes de llegar a la ruta */

/* Permitir solicitudes desde cualquier origen (CORS) */
app.use(cors());
/* Retornar JSON en las respuestas */
app.use(express.json());
/* Usar las rutas definidas en router */
app.use('/api', router);

/* listen(port: number, [callback]*/
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});

