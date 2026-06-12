import TaskFormContainer from './TaskFormContainer';
import MyButton from '../components/MyButton';
import React, { useState } from 'react';


function KanbanBoard() {
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    /* Manejador del Click para abrir el formulario */
    const handleAddButtonClick = () => {
        setMostrarFormulario(true);
    }

    const handleExportButtonClick = () => {
        alert('Funcionalidad de exportar a Excel no implementada aún');
    }

    return (
        <div>
            <h1>Kanban Board</h1>
            <MyButton texto="Agregar Tarea" onClick={handleAddButtonClick} color="primary"/>
            <MyButton texto="Exportar a Excel" onClick={handleExportButtonClick} color="secondary"/>
            {/* Se muestra el formulario si mostrarFormulario es true */}
            {mostrarFormulario && <TaskFormContainer onClose={() => setMostrarFormulario(false)} />}
        </div>
    );
}

export default KanbanBoard;