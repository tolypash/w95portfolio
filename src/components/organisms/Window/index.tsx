import React, { MouseEvent } from 'react';
import Draggable from 'react-draggable';

import IconButton from '../../atoms/IconButton';

import styles from './Window.module.scss'

interface IProps {
    draggable?: boolean,
    name: string,
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Window: React.FC<IProps> = (props) => {

    return (
        <Draggable
            handle='.handle'
        >
            <div className={styles.Window}>
                <div className={`${styles.TopBar} ${props.draggable ? 'handle drag' : ''}`}>
                    {props.name}
                    <div style={{ marginLeft: 'auto' }}>
                        {props.dismiss ? <IconButton onClick={props.dismiss}>
                            X
                        </IconButton> : null}
                    </div>
                </div>

                {props.children}
            </div>
        </Draggable>
    )
}

export default Window;