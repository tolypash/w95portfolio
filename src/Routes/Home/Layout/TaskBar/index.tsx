import React from 'react';

import StartBar from './StartBar';
import Time from './Time';
import WindowTab from './WindowTab';

import styles from './TaskBar.module.scss'

import StartIcon from '../../../../assets/img/logo64.png'

import { Window } from '../../../../Redux/reducers/windows';

interface IProps {
    windows: {
        allWindows: Window[],
        focused: {
            id: string,
            zIndex: number
        }
    }
}

const TaskBar = (props: IProps) => {
    const [startBarShown, setStartBarShown] = React.useState(false);

    React.useEffect(() => {
        console.log(props.windows)
        setStartBarShown(false)
    }, [props.windows])

    React.useEffect(() => {
        window.addEventListener('keydown', onKeyDown)
        return () => {
            window.removeEventListener('keydown', onKeyDown)
        }
    }, [startBarShown])

    const onKeyDown = (e: KeyboardEvent) => {
        switch (e.key) {
            case 'Escape':
                if (startBarShown) {
                    setStartBarShown(false)
                }
                break;
            case 'Meta':
                if (e.composedPath().length <= 4) {
                    setStartBarShown(!startBarShown)
                    break;
                }
        }
    }

    return (
        <div className={styles.TaskBar}>
            {startBarShown && <StartBar />}
            <div className={styles.Left}>
                <div
                    className={`${styles.StartButton} ${startBarShown ? styles.selected : ''}`}
                    onClick={() => setStartBarShown(!startBarShown)}
                >
                    <img src={StartIcon} className={styles.StartIcon} />
                    Start
                </div>
            </div>
            <div className={styles.Windows}>
                {props.windows.allWindows.map(window => <WindowTab {...window} />)}
            </div>
            <div className={styles.Right}>
                <div className={styles.RightWrapper}>
                    <Time />
                </div>
            </div>
        </div>
    )
}

export default TaskBar;