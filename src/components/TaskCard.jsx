import React from 'react';
import styles from '../styles/TaskCard.module.css'

function TaskCard({tarea, onClick}) {
    /* Usamos eventos e en lugar de objetos por que cambiamos de contenedores (columnas) */
    const handleDragStart = (e) => {
        /* e.dataTransfer.setData(etiqueta, datos) */
        /* Se utiliza en onDragStart y guarda la información de lo que se levantó */
        /* La etiqueta sirve para identificar el paquete, los datos son un string */
        e.dataTransfer.setData('tarea', JSON.stringify(tarea));
    }

    return(
        <div
        onClick={onClick}
        draggable="true"
        onDragStart={handleDragStart}
        role="button"
        tabIndex={0}
        className={styles.tarjeta}>
            <h1>{tarea.titulo}</h1>
            <p>{tarea.descripcion}</p>
            <span className={styles.estado}>{tarea.estado}</span>
        {/* draggable="true" permite que se pueda arrastrar. 
            role="button" permite que se le pueda hacer click a la tarjeta.
            tabIndex={0} permite la navegación con tabs.
        */}
        </div>
    );
}

export default TaskCard