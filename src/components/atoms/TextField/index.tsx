import React from 'react';
import styles from './TextField.module.scss';

interface IProps {
    id: string,
    onChangeText: Function,
    type?: string
}

const TextField: React.FC<IProps & React.HTMLProps<HTMLInputElement>> = (props) => {

    const { id, type, onChangeText, ...otherProps } = props

    return (
        <input
            id={id}
            type={type ? type : 'text'}
            className={styles.TextField}
            onChange={(e) => props.onChangeText(e.target.value)}
            {...otherProps}
        />
    )
}

export default TextField;