import React, { useState } from 'react';
import MyButton from '../components/MyButton';
import TaskColumn from './TaskColumn';
import styles from '../styles/KanbanBoard.module.css'



function KanbanBoard() {
    const handleExportButtonClick = () => {
        alert('Funcionalidad de exportar a Excel no implementada aún');
    }

    /* Esta es una variable sencilla entera que nos ayudará a refrescar las columnas cada vez que se cambie el estado.*/
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const recarcarTablero = () =>{
        setRefreshTrigger(prev => prev + 1)
    }

    return (
        <div className={styles.contenedorPrincipal}>
            <h1>Kanban Board</h1>
            <MyButton texto="Exportar a Excel" onClick={handleExportButtonClick} color="secondary"/>
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