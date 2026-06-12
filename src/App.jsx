import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import KanbanBoard from './containers/KanbanBoard'
import {ToastContainer, toast} from 'react-toastify'

/* Estilos para ToastContainer*/
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div>
      {/* ToastContainer es un componente de react-toastify que muestra los mensajes de notificación. Ya viene con estilos predefinidos, pero se pueden personalizar.
        position: posición de la notificación en la pantalla.
        autoClose: tiempo en milisegundos que la notificación se muestra antes de desaparecer automáticamente.
      */}
      <ToastContainer position="top-right" autoClose={1500} />
      <KanbanBoard />
    </div>
  )
}

export default App
