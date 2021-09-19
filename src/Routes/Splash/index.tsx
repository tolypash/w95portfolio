import React from 'react';
import SplashImage from '../../assets/img/splash.png';
import { useHistory } from 'react-router';

import styles from './Splash.module.scss'

function Splash() {
    const history = useHistory()

    React.useEffect(() => {
        setTimeout(() => history.push('/auth'), 2000)
    }, [])

    return (
        <img src={SplashImage} className={styles.MainImage} />
    )
}

export default Splash;