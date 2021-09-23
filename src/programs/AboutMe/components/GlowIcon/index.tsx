import styles from './GlowIcon.module.scss';

const GlowIcon = (props: any) => {

    return <div className={styles.GlowIcon}>
        <a href={props.link} target='_blank' rel='noreferrer'>
            {props.children}
        </a>
    </div>
}

export default GlowIcon