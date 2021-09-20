import React, { MouseEvent } from 'react';
import Draggable from 'react-draggable';

import IconButton from '../../atoms/IconButton';

import styles from './Window.module.scss'

interface IProps {
    name: string,
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    draggable?: boolean,
    resizable?:boolean
}

const Window: React.FC<IProps> = (props) => {

    return (
        <Draggable
            handle='.handle'
        >
            <div className={`${styles.Window} ${props.resizable ? styles.resize : ''}`}>
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