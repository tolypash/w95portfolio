import React from 'react';

import { useAppDispatch } from '../../Redux/hooks';

import Window from '../../components/organisms/Window';

import { Window as WindowProps } from '../../Redux/reducers/windows';

import styles from './AboutMe.module.scss'

const AboutMeProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            defaultSize='max'
        >
            <div className={styles.Container}>
                
            </div>
        </Window>
    )
}

export default AboutMeProgram