import React from 'react';
import styles from '../styles/TaskForm.module.css'

function TaskForm ({titulo, descripcion, estado, onSubmit, onChange, onClose}) {
    /* Todo input debe tener un onChange, y su value debe de ser la variable del state */
    /* Se implementan las mismas restricciones del backend en los inputs */
    return (
        <form
        className={styles.formulario}
        onSubmit={onSubmit}
        >
        
        {/* Titulo */}
        <label className={styles.labelFormulario} htmlFor="titulo">Titulo:</label>

        <input 
        className={styles.inputFormulario}
        type="text"  
        placeholder='Titulo' 
        value={titulo ? titulo : ''} 
        name="titulo" 
        onChange={onChange}
        required
        maxLength={100}
        />

        {/* Descripcion */}
        <label className={styles.labelFormulario} htmlFor="descripcion">Descripcion:</label>

        <textarea 
        className={styles.textareaDescripcion}
        placeholder='Descripcion' 
        value={descripcion ? descripcion : ''} 
        name="descripcion" 
        onChange={onChange}
        maxLength={300}
        />

        {/* Estado */}
        <label className={styles.labelFormulario} htmlFor="estado" required>Estado:</label>
        
        <select 
        className={styles.selectFormulario}
        value={estado} 
        name="estado" 
        onChange={onChange}
        required>
            <option value="Por hacer">Por hacer</option>
            <option value="En progreso">En progreso</option>
            <option value="Terminado">Terminado</option>
        </select>
        
        {/* Botón Guardar */}
        <button 
        className={styles.buttonGuardar}
        type="submit" 
        >
            Guardar Tarea    
        </button>

        {/* Botón Cancelar */}
        <button 
        className={styles.buttonCancelar}
        type="button"
        onClick={onClose}>
            Cancelar
        </button>

        </form>
    );
}

export default TaskForm;