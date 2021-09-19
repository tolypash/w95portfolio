import React from 'react';

import { Window } from '../../../../../Redux/reducers/windows';

import styles from './WindowTab.module.scss';

const WindowTab = (props:Window) => {
    return (
        <div className={styles.WindowTab}>
            {props.name}
        </div>
    )
}

export default WindowTab