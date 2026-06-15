import sqlite3 from 'sqlite3';

/* Regresa la instancia de la base de datos y la abre. Si no está disponible, la crea */
/* new sqlite3.Database(filename [, mode] [, callback])*/
const db = new sqlite3.Database('./data/kanban.sqlite', (err) => {
    if (err) {
        console.error('Error abriendo la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

/* serialize para ejecutar consultas en orden */
/* serialize([callback]) */
/* run(sql [, param, ...] [, callback]) */
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS TAREAS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo VARCHAR(100) NOT NULL,
        descripcion TEXT,
        estado TEXT NOT NULL CHECK(estado IN ('Por hacer', 'En progreso', 'Terminado'))    )`, (err) => {
        if (err) {
            console.error('Error al crear la tabla de tareas:', err.message);
        } else {
            console.log('La tabla de tareas está lista.');
        }
    });
})

export default db;