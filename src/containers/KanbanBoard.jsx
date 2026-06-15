import React, { useState } from 'react';
import MyButton from '../components/MyButton';
import TaskColumn from './TaskColumn';
import styles from '../styles/KanbanBoard.module.css';
import axios from 'axios';
/* Librería para exportar a excel */
import ExcelJS from 'exceljs';
/* Permitir guardar el archivo */
import { saveAs } from 'file-saver';


function KanbanBoard() {
const handleExportButtonClick = async () => {
        try {
            /* Regresamos objetos de respuesta de axios de todas las tareas, los cuales continen los datos en el .data */
            const [resPorHacer, resEnProgreso, resTerminado] = await Promise.all([
                axios.get('/api/tareas/Por hacer'),
                axios.get('/api/tareas/En progreso'),
                axios.get('/api/tareas/Terminado')
            ]);

            /* Metemos las tareas en un solo arreglo (solamente los datos/contenido de la respuesta)*/
            const todasLasTareas = [
                ...resPorHacer.data,
                ...resEnProgreso.data,
                ...resTerminado.data
            ];

            /* Creamos el libro y la hoja de excel */
            const workbook = new ExcelJS.Workbook();
            const worksheet = workbook.addWorksheet('Mis Tareas');

           /* Definimos las columnas */
           /*
              - header: El texto que leerá el usuario en la primera fila.
              - key: El nombre exacto de la propiedad en nuestro objeto (tarea.id, tarea.titulo) para que Excel sepa qué dato mapear.
              - width: El ancho visual de la celda en el archivo final.
            */
            worksheet.columns = [
                { header: 'Título', key: 'titulo', width: 30 },
                { header: 'Descripción', key: 'descripcion', width: 40 },
                { header: 'Estado', key: 'estado', width: 15 }
            ];

            /* Agregamos los datos */
            todasLasTareas.forEach(tarea => {
                /* addRow(datos, style?: string | undefined) */
                worksheet.addRow({
                    titulo: tarea.titulo,
                    descripcion: tarea.descripcion,
                    estado: tarea.estado
                });
            });

            /* Generamos el archivo y lo descargamos */
            const buffer = await workbook.xlsx.writeBuffer();
            saveAs(new Blob([buffer]), 'Reporte_Kanban.xlsx');

        } catch (error) {
            console.error("Error al exportar a Excel:", error);
            alert("Hubo un error al intentar generar el archivo Excel.");
        }
    }

    /* Esta es una variable sencilla entera que nos ayudará a refrescar las columnas cada vez que se cambie el estado.*/
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const recarcarTablero = () =>{
        setRefreshTrigger(prev => prev + 1)
    }

    return (
        <div className={styles.contenedorPrincipal}>
        <div className={styles.contenedorTitulo}>
            <h1 className={styles.tituloTablero}>Kanban Board</h1>
        </div>
            <div className={styles.botonExportar}>
            <MyButton texto="Exportar a Excel" onClick={handleExportButtonClick} color="secondary"/>
            </div>
        <div className={styles.tablero}>
            <TaskColumn 
                estado="Por hacer" 
                refreshTrigger={refreshTrigger} 
                onTableroUpdate={recarcarTablero} 
            />
            <TaskColumn 
                estado="En progreso" 
                refreshTrigger={refreshTrigger} 
                onTableroUpdate={recarcarTablero} 
            />
            <TaskColumn 
                estado="Terminado" 
                refreshTrigger={refreshTrigger} 
                onTableroUpdate={recarcarTablero} 
            />
            </div>
        </div>
    );
}

export default KanbanBoard;