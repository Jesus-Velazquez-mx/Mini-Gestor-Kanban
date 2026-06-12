import React from 'react';
import styles from '../styles/MyButton.module.css'

function MyButton({texto, onClick, color}) {
  return (
    <button type="button"
    className={`${styles.botonBase} ${color === 'primary' ? styles.primario : styles.secundario}`}    
    onClick={onClick} 
    > 
        {texto}
    </button>
  )
}

export default MyButton;