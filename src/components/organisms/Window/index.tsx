import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';

import Draggable from 'react-draggable';

import IconButton from '../../atoms/IconButton';

import styles from './Window.module.scss'

interface IProps {
    id: string,
    name: string,
    minimized?: boolean,
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    draggable?: boolean,
    resizable?: boolean
}

const Window: React.FC<IProps> = (props) => {

    const dispatch = useAppDispatch()

    const [sizeState, setSizeState] = React.useState('free')

    const resize = (type: 'max' | 'free') => {
        if (sizeState === 'free' || type !== sizeState) {
            setSizeState(type)
            return;
        }

        setSizeState('free')
    }

    if (props.minimized) {
        return null
    }

    return (
        <Draggable
            handle='.handle'
            bounds='parent'
        >
            <div className={`${styles.Window} ${props.resizable ? styles.resize : ''} ${styles[sizeState]}`}>
                <div className={`${styles.TopBar} ${props.draggable ? 'handle drag' : ''}`}>
                    {props.name}
                    <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
                        {props.resizable && <>
                            <IconButton onClick={() => dispatch({ type: 'windows/edit', payload: { id: props.id, minimized: true } })}>
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