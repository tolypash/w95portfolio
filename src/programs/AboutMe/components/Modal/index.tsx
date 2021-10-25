import React from 'react';

import { X } from 'react-feather';

import styles from './Modal.module.scss';

interface IProps {
    active: boolean
    setActive: (bool: boolean) => void
    title?: string
}

const Modal: React.FC<IProps> = props => {

    return (
        <div
            className={`${styles.ModalWrapper} ${props.active ? styles.active : ''}`}
            onClick={() => {
                props.setActive(false)
            }}
        >
            <div
                className={styles.Modal}
                onClick={(e) => e.stopPropagation()}
            >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ flex: 1 }}>
                    </div>
                    <h2 style={{ color: '#000' }}>{props.title}</h2>
                    <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                        <div style={{ cursor: 'pointer', paddingRight: 10 }} onClick={() => { props.setActive(false) }}>
                            <X color='red' strokeWidth={3} size={28} />
                        </div>
                    </div>
                </div>

                {props.children}
            </div>
        </div>
    )
}

export default Modal