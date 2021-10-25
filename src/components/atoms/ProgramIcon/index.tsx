import React from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import useIsMobile from '../../../hooks/useIsMobile';

import styles from './ProgramIcon.module.scss';

import { File } from '../../../Redux/reducers/storage';

interface IProps {
    style?: React.CSSProperties
}

const ProgramIcon :React.FC<React.HTMLProps<HTMLDivElement> & File & IProps> = props => {
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile()

    const { slug, sdata, ...otherProps } = props

    const openWindow = () => dispatch({
        type: 'windows/open',
        payload: {
            slug: props.slug,
            sdata: { ...sdata, name: props.name }
        }
    })

    return (
        <div
            className={styles.ProgramIcon + ' noSelect'}
            {...otherProps}
            onClick={() => isMobile && openWindow()}
            onDoubleClick={() => !isMobile && openWindow()}
        >
            <img src={props.sdata?.icon} alt='icon' />
            <br />
            <span>{props.name}</span>
        </div>
    )
}

export default ProgramIcon;