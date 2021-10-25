import React from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import useIsMobile from '../../../hooks/useIsMobile';

import DirectoryIcon from '../../../assets/icons/directory.png';

import styles from './FolderIcon.module.scss';

import { Directory } from '../../../Redux/reducers/storage';

interface IProps {
    style?: React.CSSProperties
    onClick?: () => void
}

const FolderIcon: React.FC<React.HTMLProps<HTMLDivElement> & Directory & IProps> = props => {
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile()

    const { sdata, ...otherProps } = props

    const openWindow = () => {
        if (props.onClick) {
            props?.onClick()
        } else {
            dispatch({
                type: 'windows/open',
                payload: {
                    slug: 'explorer',
                    sdata: { ...sdata, ref: sdata?.ref + `/${props.name}`, name: 'Explorer' }
                }
            })
        }
    }

    return (
        <div
            className={styles.ProgramIcon + ' noSelect'}
            {...otherProps}
            onClick={() => isMobile && openWindow()}
            onDoubleClick={() => !isMobile && openWindow()}
        >
            <img src={DirectoryIcon} alt='icon' />
            <br />
            <span>{props.name}</span>
        </div>
    )
}

export default FolderIcon;