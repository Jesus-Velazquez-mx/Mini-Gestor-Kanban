import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import TaskCard from '../components/TaskCard';
import TaskFormContainer from './TaskFormContainer';
import MyButton from '../components/MyButton';
import styles from '../styles/TaskColumn.module.css'

function TaskColumn({estado, refreshTrigger, onTableroUpdate}){
    const [tareas, setTareas] = useState([]);
    const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
    const [mostrarFormulario, setMostrarFormulario] = useState(false);

    /* Manejador del Click para abrir el formulario */
    const handleAddButtonClick = () => {
        /* Si creamos una tarea nueva, no debería haber una tarea seleccionada */
        setTareaSeleccionada(null); 
        setMostrarFormulario(true);
    }

    const handleCardClick = (tarea) => {
        /* Si hacemos click en una tarea existente, la cachamos y la asigmaos a tareaSeleccionada */
        setTareaSeleccionada(tarea);
        setMostrarFormulario(true);
    }

    const obtenerTareas = () => {
            axios.get(`/api/tareas/${estado}`)
                .then(response => {
                    setTareas(response.data);
                    console.log('Tareas obtenidas correctamente:', response.data);
                })
                .catch(error => {
                    console.log('Error obteniendo tareas :', error);
                });
    }
    

    /* Metenmos el useEffect en una función separada para poder llamarlo cada vez que se edite una tarea. Recibe el trigger para refrescar
    y cambiar de columna una tarea cuyo estado cambió */
    useEffect(
        obtenerTareas, [estado, refreshTrigger]
    );

    /* Esto va a habilitar el contenedor para que se le puedan soltar cosas*/
    const handleDragOver = (e) => {
        e.preventDefault(); 
    };

    /* Aquí vamos a manejar cuando se suelte una tarjeta*/
    const handleDrop = async (e) => {
        e.preventDefault();
        
        /* e.dataTransfer.getData(etiqueta)*/
        /* Recupera la información que venía en el evento. Hay que guardarla en una variable */
        const tareaString = e.dataTransfer.getData('tarea');

        if (!tareaString) {
            return
        }; 
        
        /* JSON.parse(string)*/
        /* Convierte un string a un JSON */
        const tareaArrastrada = JSON.parse(tareaString);

        /* Si se suelta donde mismo no pasa nada*/
        if (tareaArrastrada.estado === estado) {
            return;
        }

        /* Cambiamos el estado */
        const tareaActualizada = { 
            ...tareaArrastrada, 
            estado: estado 
        };

        try {
            await axios.put(`/api/tareas/${tareaActualizada.id}`, tareaActualizada);
            toast.success(`Tarea movida a ${estado}`);
            
            if (onTableroUpdate) {
                onTableroUpdate();
            }
        } catch (error) {
            console.error('Error al mover la tarea:', error);
            toast.error('Error al mover la tarea');
        }
    };


    return(
        <div className={styles.contenedorColumna}>
        <h1>{estado}</h1>
        <div className={styles.columna}
             onDragOver={handleDragOver}
             onDrop={handleDrop}
        >
            {/* 
            onDragOver: Habilita esta zona para que acepte elementos (evita el bloqueo por defecto del navegador). 
            onDrop: Atrapa la tarjeta en el instante que la soltamos para procesar sus datos. 
            */}
            {/* Mapeamos cada una de las tareas del arreglo dentro del contenedor.*/}
            {tareas.map(tarea => (
                <TaskCard 
                key={tarea.id} 
                tarea={tarea} 
                onClick={() => handleCardClick(tarea)} />
            ))}
            {/* Se muestra el formulario si mostrarFormulario es true */}
            {mostrarFormulario && <TaskFormContainer tareaAEditar={tareaSeleccionada} onClose={() => setMostrarFormulario(false)} onTareaGuardada={onTableroUpdate} estado={estado}/>}
        </div>
            {/* Agregamos un botón debajo de todas las tarjetas */}
            <MyButton texto="Agregar Tarea" 
            onClick={handleAddButtonClick} 
            fullWidth={true}
            color="primary"/>
        </div>
    );

}
export default TaskColumn;