import React, { MouseEvent } from 'react';

import styles from './SavePopup.module.scss';

import Window from '../../Window';
import Button from '../../../atoms/Button';
import IconButton from '../../../atoms/IconButton';
import TextField from '../../../atoms/TextField';

interface IProps {
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SavePopup: React.FC<IProps> = (props) => {

    return (
        <Window id='save' name='Save As' dismiss={props.dismiss} draggable zIndex={999}>
            <div className={styles.Container}>
                <div className={styles.TopContainer}>
                    Save in:
                    <TextField id='save_location' onChangeText={() => { }} />
                    <Button
                        style={{ minWidth: 25, marginRight: 5, marginBottom: 0, marginTop: 0 }}
                        onClick={() => { }}
                    >
                        ..
                    </Button>
                    <Button
                        style={{ marginBottom: 0, marginTop: 0 }}
                        onClick={() => { }}
                    >
                        New Folder
                    </Button>
                </div>
                <div className={styles.MainContainer}>

                </div>

                <div className={styles.SideContainer}>
                </div>
            </div>
        </Window>
    )
}

export default SavePopup