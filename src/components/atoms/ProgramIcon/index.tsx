import React from 'react';
import { useAppDispatch } from '../../../Redux/hooks';

import styles from './ProgramIcon.module.scss';

import { File } from '../../../Redux/reducers/storage';

const ProgramIcon = (props: React.HTMLProps<HTMLDivElement> & File) => {
    const dispatch = useAppDispatch()

    const { slug, data = {}, ...otherProps } = props

    return (
        <div
            className={styles.ProgramIcon + ' noSelect'}
            {...otherProps}
            onDoubleClick={() => {
                dispatch({
                    type: 'windows/open',
                    payload: {
                        slug: props.slug,
                        ...data
                    }
                })
            }}
        >
            <img src={props.sdata?.icon} />
            <br />
            <span>{props.name}</span>
        </div>
    )
}

export default ProgramIcon;