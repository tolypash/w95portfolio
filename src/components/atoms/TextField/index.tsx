import React from 'react';
import styles from './TextField.module.scss';

interface IProps {
    id: string,
    onChange: Function,
    type?: string
}

const TextField: React.FC<IProps> = (props) => {

    return (
        <input
            id={props.id}
            type={props.type ? props.type : 'text'}
            className={styles.TextField}
            onChange={(e) => props.onChange(e.target.value)}
        />
    )
}

export default TextField;