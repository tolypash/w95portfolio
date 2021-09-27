import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';

import Window from '../../components/organisms/Window';
import SavePopup from '../../components/organisms/Popups/Save';

import { Window as WindowProps } from '../../Redux/reducers/windows';

import styles from './Notepad.module.scss'

const NotepadProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    const [savePopupShown, setSavePopupShown] = React.useState(true)

    return (
        <>
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
                        onClick={() => setSavePopupShown(true)}
                    >
                        Save as...
                    </div>
                </div>
                <textarea className={styles.TextArea} />

                {savePopupShown && <SavePopup dismiss={() => setSavePopupShown(false)} />}
            </div>
        </Window>

        </>
    )
}

export default NotepadProgram