import React from 'react';
import { useAppDispatch } from '../../../Redux/hooks';

import styles from './ProgramIcon.module.scss';

import { File } from '../../../Redux/reducers/storage';

interface IProps {
    name: string,
    icon: string,
    overrideSingleInstance?: boolean
}

const ProgramIcon = (props: File & IProps & React.HTMLProps<HTMLDivElement>) => {
    const dispatch = useAppDispatch()

    const { icon, name, ...otherProps } = props

    return (
        <div
            className={styles.ProgramIcon + ' noSelect'}
            {...otherProps}
            onDoubleClick={() => {
                dispatch({
                    type: 'windows/open',
                    payload: {
                        name: props.name,
                        slug: props.slug,
                        overrideSingleInstance: props.overrideSingleInstance
                    }
                })
            }}
        >
            <img src={props.icon} />
            <br />
            <span>{props.name}</span>
        </div>
    )
}

export default ProgramIcon;