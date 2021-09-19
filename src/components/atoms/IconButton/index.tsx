import React from 'react';
import styles from './IconButton.module.scss'

const IconButton: React.FC<{ onClick: Function }> = (props) => {

    return (
        <div className={styles.IconButton} onClick={() => props.onClick()}>
            {props.children ? props.children : null}
        </div>
    )
}

export default IconButton;