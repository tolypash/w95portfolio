import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';

import Window from '../../components/organisms/Window';

import { Window as WindowProps } from '../../Redux/reducers/windows';

import styles from './Notepad.module.scss'

const NotepadProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
        >
            <div className={styles.Container}>
                <div className={styles.TopBar}>
                    <div
                        className={'clickable'}
                        onClick={() => dispatch({ type: 'windows/open', payload: { slug: props.slug } })}
                    >
                        New
                    </div>
                    <div
                        className={'clickable'}
                        onClick={() => { }}
                    >
                        Save
                    </div>
                    <div
                        className={'clickable'}
                        onClick={() => { }}
                    >
                        Save as...
                    </div>
                </div>
                <textarea className={styles.TextArea} />
            </div>
        </Window>
    )
}

export default NotepadProgram