import React from 'react';

import styles from './ProjectCard.module.scss'

import { Globe, Image } from 'react-feather';

interface IProps {
    logoSrc: string
    name: string
    tech: string[]
    desc: () => JSX.Element
    screenshots?: string[]
    webURL?: string
    showImages?: () => void
    onClick?: () => void
}

const ProjectCard: React.FC<IProps> = (props) => {

    const style: React.CSSProperties = {}

    if (props.onClick) {
        style.cursor = 'pointer'
    }

    return <div className={styles.Card} style={style}>
        {/* REVERSED DIV! (in order for .Screenshots to be the next sibling of .Links to apply hover effect in CSS) */}

        <div className={styles.Links}>
            {props.webURL && <a href={props.webURL} target='_blank' rel='noreferrer'>
                <Globe />
            </a>}

            {props.showImages && <div onClick={props.showImages}>
                <Image />
            </div>}
        </div>

        <div className={styles.Screenshots}>
            {props.screenshots?.map((url, index) => <img key={props.name + 'sc' + index} src={url} alt={'project screenshot'} />)}
        </div>

        <div className={styles.DescContainer}>
            <span className={styles.Name}>{props.name.toUpperCase()}</span>
            <span className={styles.Tech}>{props.tech.join(' | ')}</span>
            <div className={styles.Desc}>
                {props.desc()}
            </div>
        </div>

        <img className={styles.Icon} src={props.logoSrc} alt='project logo' />
    </div>
}

export default ProjectCard