import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';
import useIsMobile from '../../hooks/useIsMobile';

import Window from '../../components/organisms/Window';
import SavePopup from '../../components/organisms/Popups/Save';

import { Window as WindowProps } from '../../Redux/reducers/windows';

import styles from './Notepad.module.scss'

const NotepadProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    const [savePopupShown, setSavePopupShown] = React.useState(false)
    const [data, setData] = React.useState(props.sdata?.text || '')

    const isMobile = useIsMobile()

    return (
        <>
            <Window
                {...props}
                dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
                draggable
                resizable
                style={{
                    minWidth: !isMobile ? 700 : undefined,
                    minHeight: 500
                }}
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
                            onClick={() => {
                                if (props.sdata?.ref) {
                                    const fileData = { text: data }
                                    dispatch({ type: 'storage/save', payload: { name: props.sdata.name, ref: props.sdata.ref, sdata: fileData } })
                                } else {
                                    setSavePopupShown(true)
                                }
                            }}
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
                    <textarea className={styles.TextArea} onChange={(e) => setData(e.target.value)} value={data} />

                    {savePopupShown && (
                        <SavePopup
                            data={{ text: data }}
                            dismiss={() => setSavePopupShown(false)}
                        />
                    )}
                </div>
            </Window>
        </>
    )
}

export default NotepadProgram