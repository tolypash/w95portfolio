import React, { MouseEvent } from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import useIsMobile from '../../../hooks/useIsMobile';

import Draggable from 'react-draggable';

import IconButton from '../../atoms/IconButton';

import styles from './Window.module.scss'

interface WindowProps {
    id: string,
    name: string,
    zIndex: number,
    minimized?: boolean,
    defaultSize?: 'free' | 'max'
}

interface IProps {
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
    draggable?: boolean,
    resizable?: boolean
}

const Window: React.FC<WindowProps & IProps & React.HTMLProps<HTMLDivElement>> = (props) => {
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile()

    const [sizeState, setSizeState] = React.useState(props.defaultSize || 'free')

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
            cancel={'.cancelDrag'}
        >
            <div
                className={`${styles.Window} 
                ${props.resizable ? styles.resize : ''} 
                ${styles[sizeState]} ${props.minimized ? 'hidden' : ''}`}
                style={{ 
                    zIndex: props.zIndex, 
                    width: isMobile ? '100%' : undefined,
                    ...props.style 
                }}
            >
                <div className={`${styles.TopBar} ${props.draggable ? 'handle drag' : ''}`}>
                    {props.name}
                    <div className='cancelDrag' style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
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