import styles from './GlowIcon.module.scss';

import { Globe } from 'react-feather';

const GlowIcon = (props:any) => {

    return <div className={styles.GlowIcon}>
        <Globe size={30} />
    </div>
}

export default GlowIcon