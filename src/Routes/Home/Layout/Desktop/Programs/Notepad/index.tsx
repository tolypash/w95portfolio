import React from 'react';
import { useAppDispatch } from '../../../../../../Redux/hooks';

import Window from '../../../../../../components/organisms/Window';

import { Window as WindowProps } from '../../../../../../Redux/reducers/windows';

import styles from './Notepad.module.scss'

const NotepadProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            name='Notepad'
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
        >
            <div className={styles.Container}>
            <textarea className={styles.TextArea} />
            </div>
        </Window>
    )
}

export default NotepadProgram