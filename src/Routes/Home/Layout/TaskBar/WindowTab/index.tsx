import React from 'react';
import { useAppDispatch } from '../../../../../Redux/hooks';

import { Window } from '../../../../../Redux/reducers/windows';

import styles from './WindowTab.module.scss';

const WindowTab = (props: Window & { focused: boolean }) => {
    const dispatch = useAppDispatch()

    const handleClick = () => {
        let dispatchType = 'windows/focus'

        if (props.focused && !props.minimized) {
            dispatchType = 'windows/minimize'
        }

        const payload: {id:string} = {
            id: props.id
        }

        dispatch({
            type: dispatchType,
            payload: payload
        })
    }

    return (
        <div
            className={`${styles.WindowTab} ${props.focused ? styles.focused : ''}`}
            onClick={handleClick}
        >
            {props.name}
        </div>
    )
}

export default WindowTab