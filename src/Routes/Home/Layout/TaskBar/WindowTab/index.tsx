import React from 'react';
import { useAppDispatch } from '../../../../../Redux/hooks';

import { Window } from '../../../../../Redux/reducers/windows';

import styles from './WindowTab.module.scss';

const WindowTab = (props: Window) => {
    const dispatch = useAppDispatch()

    const handleClick = () => {

        let dispatchType = 'windows/edit';

        const payload: any = {
            id: props.id
        }

        if (!props.minimized) {
            dispatchType = 'windows/bringToFront'
        } else {
            payload.minimized = false
        }

        dispatch({
            type: dispatchType,
            payload: payload
        })
    }

    return (
        <div
            className={styles.WindowTab}
            onClick={handleClick}
        >
            {props.name}
        </div>
    )
}

export default WindowTab