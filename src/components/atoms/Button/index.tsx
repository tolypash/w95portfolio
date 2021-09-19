import React from 'react';
import styles from './Button.module.scss'


const Button: React.FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
    return (
        <button
            onClick={props.onClick}
            className={`${styles.Button} ${props.children === 'OK' ? styles.submit : ''}`}
            type={props.type}
        >
            {props.children}
        </button>
    )
}

export default Button;