import React from 'react';
import styles from './Button.module.scss'


const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            className={`${styles.Button} ${props.children === 'OK' ? styles.submit : ''}`}
            {...props}
        >
            {props.children}
        </button>
    )
}

export default Button;