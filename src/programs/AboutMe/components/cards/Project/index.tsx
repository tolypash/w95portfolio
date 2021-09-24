import React from 'react';

import styles from './ProjectCard.module.scss'

import { Globe } from 'react-feather';

interface IProps {
    logoSrc: string,
    name: string,
    tech: string[],
    desc: () => JSX.Element,
    screenshots?: string[],
    webURL?: string
}

const ProjectCard: React.FC<IProps> = (props) => {

    return <div className={styles.Card}>
        {/* REVERSED DIV! */}

        <div className={styles.Links}>
            {props.webURL && <a href={props.webURL} target='_blank' rel='noreferrer'>
                <Globe />
            </a>}
        </div>

        <div className={styles.Screenshots}>
            {props.screenshots?.map((url, index) => <img id={props.name + 'sc' + index} src={url} alt={'sc' + index} />)}
        </div>

        <div className={styles.DescContainer}>
            <span className={styles.Name}>{props.name.toUpperCase()}</span>
            <span className={styles.Tech}>{props.tech.join(' | ')}</span>
            <div className={styles.Desc}>
                {props.desc()}
            </div>
        </div>

        <img className={styles.Icon} src={props.logoSrc} />
    </div>
}

export default ProjectCard