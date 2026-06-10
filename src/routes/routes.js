/* Siempre se importa express */
import express from 'express'; 
/* Importamos las funciones del controlador (tareaController.js) */
import tareaController from '../controllers/tareaController.js';

/* Desestructuramos las funciones del controlador para usarlas en las rutas */
const { listarTareas, crearTarea, actualizarTarea, eliminarTarea } = tareaController;

/* Router es una función de Express que permite definir rutas (get, post, put, delete) */
/* Se debe crear una instancia de Router llamada router */
const router = express.Router();

/* Definimos las rutas para cada operación. */
/* Usamos el router.accion('/ruta', funcion)*/
router.get('/tareas/:estado', listarTareas);
router.post('/tareas', crearTarea);
router.put('/tareas/:id', actualizarTarea);
router.delete('/tareas/:id', eliminarTarea);

export default router;