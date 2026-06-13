import React from 'react';
import styles from '../styles/MyButton.module.css'

function MyButton({texto, onClick, color, fullWidth}) {
  return (
    <button type="button"
    className={`${styles.botonBase} ${color === 'primary' ? styles.primario : styles.secundario}`}    
    onClick={onClick} 
    style={{ width: fullWidth ? '100%' : undefined }}
    > 
        {texto}
    </button>
  )
}

export default MyButton;