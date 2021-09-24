import React from 'react';
import { useAppDispatch } from '../../../../../Redux/hooks';

import { Window } from '../../../../../Redux/reducers/windows';

import styles from './WindowTab.module.scss';

import defaultPrograms from '../../../../../programs/default';

const WindowTab = (props: Window & { focused: boolean }) => {
    const dispatch = useAppDispatch()

    console.log(defaultPrograms[props.slug])

    const image = defaultPrograms[props.slug]?.icon;

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
            {image && <img src={image} alt='window icon' />}
            {props.name}
        </div>
    )
}

export default WindowTab