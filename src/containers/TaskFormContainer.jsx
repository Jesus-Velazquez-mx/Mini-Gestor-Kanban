import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm'
import axios from 'axios';
import { toast } from 'react-toastify';
import styles from '../styles/TaskFormContainer.module.css'

function TaskFormContainer({tareaAEditar, onClose}) {
    const [tarea, setTarea] = useState({
        id: null,
        titulo: '',
        descripcion: '',
        estado: 'Por hacer'
    });

    /* En caso de que se renderice el componente con una tarea a editar */
    useEffect(() => {
    if (tareaAEditar) {
      setTarea(tareaAEditar); 
    }
  }, [tareaAEditar])

    const handleOnSubmit = async (e) => {
        /* Evitamos que la página se recargue */
        e.preventDefault();

        /* Agregamos o editamos la tarea en el backend */
        try{
            /* Si la tarea tiene un ID, es una edición; de lo contrario, es una creación */
            /* axios.metodoHTTP(url, body)*/
            if(tarea.id){
                await axios.put(`http://localhost:3000/api/tareas/${tarea.id}`, tarea);
                toast.success('Tarea editada con éxito');
                console.log('Tarea editada con éxito' , tarea);
            }else{
                await axios.post('http://localhost:3000/api/tareas', tarea);
                toast.success('Tarea creada con éxito');
                console.log('Tarea creada con éxito' , tarea);
            }

        /* Limpiamos el formulario después de enviar la tarea */
        setTarea({
            id: null,
            titulo: '',
            descripcion: '',
            estado: 'Por hacer'
        });
        /* Cerramos el formulario después de enviar la tarea */
        onClose();

        }catch(error){
            toast.error('Error al crear la tarea');
            console.error('Error al crear la tarea:', error);
        }
    }

    /* Manejador de cambios en los campos del formulario. Si no existiera, no se podrían editar los campos del formulario */
    /* Permite que el input se actualice en tiempo real */
    const handleChange = ({target}) => {
        /* Tomamos lo que ya existe y actualizamos el campo correspondiente */
        setTarea({
            ...tarea,
            [target.name]: target.value
        });
    }

    return (
        <div className={styles.contenedorModal}>
        <div className={styles.contenidoModal}>
        <TaskForm titulo={tarea.titulo} 
        descripcion={tarea.descripcion} 
        estado={tarea.estado} 
        onSubmit={handleOnSubmit} 
        onChange={handleChange}
        onClose={onClose}/>
        </div>
        </div>
    );
}

export default TaskFormContainer;