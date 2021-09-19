import React from 'react';
import Desktop from './Desktop';
import TaskBar from './TaskBar';

import styles from './Layout.module.scss';

import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';

const Layout = () => {
    const windows = useAppSelector(state => state.windows);

    const commonProps = {
        windows: windows,
    }

    return (
        <div className={styles.Container}>
            <Desktop {...commonProps} />
            <TaskBar {...commonProps} />
        </div>
    )
}

export default Layout;