/* Siempre debemos de importar la base de datos*/
import db from '../database/database.js';
/* zod es una libreria para manejar restricciones */
import { z } from 'zod';

/* tareaSchema es un objeto de validación que contiene las reglas para cada campo */
const tareaSchema = z.object({
    titulo: z.string().max(100),
    descripcion: z.string().max(200).optional(),
    estado: z.enum(["Por hacer", "En progreso", "Terminado"])
});

/* Una funcion de express sigue el formato (req, res, next) => {} */
/* .params viene de la URL, .body viene del cuerpo de la solicitud (el objeto) del frontend */
const listarTareas = (req, res) => {
    try{
        const { estado } = req.params;
        /* db.all(sql (string), [param, ...], callback) */
        /* all es una funcion que devuelve todas las filas que coinciden con la consulta */
        db.all('SELECT * FROM TAREAS WHERE estado = ?', [estado], (err, rows) => {
            if (err) {
                console.error('Error al listar las tareas:', err.message);
                res.status(500).json({ error: 'Error al listar las tareas' });
            } else {
                res.json(rows);
            }
        });

    }catch(error){
        console.error('Error al listar las tareas:', error);
        res.status(500).json({ error: 'Error al listar las tareas' });
    }
}

const crearTarea = (req, res) => {
    try {
        /* safeParse es una funcion de zod que valida los datos desde el objeto */
        const validationResult = tareaSchema.safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.flatten().fieldErrors });
        }

        /* validationResult es un objeto que tiene booleano y los datos validados estan en el campo "data" */
        const { titulo, descripcion, estado } = validationResult.data;

        /* db.run(sql (string), [param, ...], callback) */
        /* run es una funcion que ejecuta una insercion, actualizacion o eliminacion */
        /* Usamos function(err) porque sqlite regresa lastID que se puede acceder a traves de this.lastID */
        db.run('INSERT INTO TAREAS (titulo, descripcion, estado) VALUES (?, ?, ?)', [titulo, descripcion, estado], function(err) {
            if (err) {
                console.error('Error al crear la tarea:', err.message);
                res.status(500).json({ error: 'Error al crear la tarea' });
            } else {
                res.status(201).json({ id: this.lastID, titulo, descripcion, estado });
            }
        });
    } catch (error) {
        console.error('Error al crear la tarea:', error);
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
}

const actualizarTarea = (req, res) => {
    try {
        const { id } = req.params;
        /* partial() es una funcion de zod que hace que todos los campos sean opcionales,
        esto es necesario para la actualizacion porque el cliente puede enviar solo los campos que desea cambiar */ 
        const validationResult = tareaSchema.partial().safeParse(req.body);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.flatten().fieldErrors });
        }

        /* validationResult es un objeto que tiene booleano y los datos validados estan en el campo "data" */
        const { titulo, descripcion, estado } = validationResult.data;
    
        /* En esta consulta usamos COALESCE para mantener el valor actual si el cliente no proporciona un nuevo valor para ese campo */
        /* Elige el valor que no es NULL e ignora los demás */
        db.run('UPDATE TAREAS SET titulo = COALESCE(?, titulo), descripcion = COALESCE(?, descripcion), estado = COALESCE(?, estado) WHERE id = ?', [titulo, descripcion, estado, id], function(err) {
            if (err) {
                console.error('Error al actualizar la tarea:', err.message);
                res.status(500).json({ error: 'Error al actualizar la tarea' });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'Tarea no encontrada' });
            } else {
                res.json({ 
                    mensaje: 'Tarea actualizada correctamente',
                    datosActualizados: validationResult.data
                });
            }
        });
    } catch (error) {
        console.error('Error interno:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const eliminarTarea = (req, res) => {
    try{
        const { id } = req.params;

        db.run('DELETE FROM TAREAS WHERE id = ?', [id], function(err) {
            if (err) {
                console.error('Error al eliminar la tarea:', err.message);
                res.status(500).json({ error: 'Error al eliminar la tarea' });
            } else if (this.changes === 0) {
                res.status(404).json({ error: 'Tarea no encontrada' });
            } else {
                res.json({ mensaje: 'Tarea eliminada correctamente' });
            }
        });
    }catch(error){
        console.error('Error al eliminar la tarea:', error);
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
}

export default { listarTareas, crearTarea, actualizarTarea, eliminarTarea };