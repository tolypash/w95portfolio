import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';

import Draggable from 'react-draggable';

import IconButton from '../../atoms/IconButton';

import styles from './Window.module.scss'

interface WindowProps {
    id: string,
    name: string,
    zIndex: number,
    minimized?: boolean
}

interface IProps {
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    draggable?: boolean,
    resizable?: boolean
}

const Window: React.FC<WindowProps & IProps & React.HTMLProps<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch()

    const [sizeState, setSizeState] = React.useState('free')

    const resize = (type: 'max' | 'free') => {
        if (sizeState === 'free' || type !== sizeState) {
            dispatch({ type: 'windows/focus', payload: { id: props.id } })
            setSizeState(type)
            return;
        }

        setSizeState('free')
    }

    return (
        <Draggable
            handle='.handle'
            bounds='parent'
            onMouseDown={() => {
                dispatch({ type: 'windows/focus', payload: { id: props.id } })
            }}
        >
            <div
                className={`${styles.Window} 
                ${props.resizable ? styles.resize : ''} 
                ${styles[sizeState]} ${props.minimized ? 'hidden' : ''}`}
                style={{ zIndex: props.zIndex, ...props.style }}
            >
                <div className={`${styles.TopBar} ${props.draggable ? 'handle drag' : ''}`}>
                    {props.name}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        {props.resizable && <>
                            <IconButton onClick={() => dispatch({ type: 'windows/minimize', payload: { id: props.id } })}>
                                _
                            </IconButton>

                            <IconButton onClick={() => resize('max')}>
                                ❐
                            </IconButton>
                        </>}
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