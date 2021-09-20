import React, { MouseEvent } from 'react';

import styles from './ErrorPopup.module.scss';

import Window from '../../Window';
import Button from '../../../atoms/Button';

import ErrorIcon from '../../../../assets/icons/msg_error-0.png';

interface IProps {
    text: string,
    dismiss?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const ErrorPopup: React.FC<IProps> = (props) => {

    return (
        <Window id='error' name='Error' dismiss={props.dismiss} draggable zIndex={999}>
            <div style={{ display: 'flex', overflow: 'hidden', margin: 10 }}>
                <div className={styles.SideContainer}>
                    <img src={ErrorIcon} className={styles.Icon} alt='error' />
                </div>

                <div className={styles.MainContainer}>
                    {props.text}
                    <div style={{ marginTop: 35 }}>
                        <Button onClick={props.dismiss}>OK</Button>
                    </div>
                </div>
            </div>
        </Window>
    )
}

export default ErrorPopup