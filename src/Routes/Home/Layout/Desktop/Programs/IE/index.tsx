import React from 'react';
import { useAppDispatch } from '../../../../../../Redux/hooks';

import Window from '../../../../../../components/organisms/Window';

import { Window as WindowProps } from '../../../../../../Redux/reducers/windows';

import styles from './IE.module.scss';

const InternetExplorerProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
        >
            <div className={styles.TopBar}>

            </div>

            <div className={styles.Actionbar}>
            
            </div>
        </Window>
    )
}

export default InternetExplorerProgram