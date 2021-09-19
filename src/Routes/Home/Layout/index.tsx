import React from 'react';
import Desktop from './Desktop';
import TaskBar from './TaskBar';

import styles from './Layout.module.scss'

const Layout = () => {

    return (
        <div className={styles.Container}>
            <Desktop />
            <TaskBar />
        </div>
    )
}

export default Layout;