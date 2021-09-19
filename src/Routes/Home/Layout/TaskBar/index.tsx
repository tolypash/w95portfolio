import React from 'react';

import StartBar from './StartBar';
import Time from './Time';

import styles from './TaskBar.module.scss'

import StartIcon from '../../../../assets/img/logo64.png'

import { Window } from '../../../../Redux/reducers/windows';

interface IProps {
    windows: Window[]
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
        console.log(e.key)
        switch (e.key) {
            case 'Escape':
                if (startBarShown) {
                    setStartBarShown(false)
                }
                break;
            case 'Meta':
                setStartBarShown(!startBarShown)
                break;
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