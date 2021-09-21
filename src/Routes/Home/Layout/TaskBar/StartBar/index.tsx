import React from 'react';
import { useHistory } from 'react-router';
import { useAppDispatch } from '../../../../../Redux/hooks';

import styles from './StartBar.module.scss';

import Divider from '../../../../../components/ions/Divider';

import ProgramsIcon from '../../../../../assets/icons/programs.png';
import SettingsIcon from '../../../../../assets/icons/settings.png';
import LogOffIcon from '../../../../../assets/icons/key_win-4.png';
import NotepadIcon from '../../../../../assets/icons/notepad.png';
import IEIcon from '../../../../../assets/icons/msie.png';

const StartBar: React.FC = (props) => {
    const history = useHistory()
    const dispatch = useAppDispatch();

    const run = (programSlug: string, ref?: string) =>
        dispatch({
            type: 'windows/open',
            payload: {
                slug: programSlug,
                ref: ref
            }
        })

    const DATA = [
        {
            label: 'Programs',
            icon: ProgramsIcon,
            options: [
                {
                    label: 'Notepad',
                    icon: NotepadIcon,
                    onClick: () => run('notepad')
                },
                {
                    label: 'Internet Explorer',
                    icon: IEIcon,
                    onClick: () => run('ie')
                }
            ]
        },
        {
            label: 'Settings',
            icon: SettingsIcon,
            onClick: () => run('settings')
        },
        {
            divider: true
        },
        {
            label: 'Log off...',
            icon: LogOffIcon,
            onClick: () => history.push('/auth')
        }
    ]

    return (
        <div className={styles.StartBar}>
            <div className={styles.Left}>
                <div className={styles.LeftWin95}>
                    <span style={{ fontWeight: 900, color: '#bababa' }}>Windows</span>
                    <span style={{ color: 'white' }}>95</span>
                </div>
            </div>
            <div className={styles.Main}>
                {DATA.map((el, index: number) =>
                    el.divider ? <Divider key={`div_${index}`} /> : <Row key={`${el.label}_${index}`} label={el.label} options={el.options} onClick={el.onClick}>
                        <img src={el.icon} className={styles.RowIcon} alt='icon' />
                    </Row>)}
            </div>
        </div>
    )
}

const Row: React.FC<{ label?: string, options?: any, onClick?: Function }> = (props) => {
    const [focused, setFocused] = React.useState(false)

    return (
        <div
            className={styles.Row}
            onClick={() => props.onClick && props.onClick()}
            onMouseEnter={() => setFocused(true)}
            onMouseLeave={() => setFocused(false)}
        >
            {props.children}
            <div style={{ flex: 1, color: 'inherit' }}>
                {props.label}
            </div>
            {props.options && <>
                <span style={{ paddingRight: 8, color: 'inherit' }}>
                    ►
                </span>

                {focused && <div className={styles.RowExpandableOptions}>
                    {props.options.map((el: any, index: number) =>
                        <Option key={`o_${el.label}_${index}`} label={el.label} onClick={el.onClick}>
                            <img src={el.icon} className={styles.OptionIcon} alt='icon' />
                        </Option>)}
                </div>}
            </>}
        </div>
    )
}

const Option: React.FC<{ label: string, options?: any, onClick?: Function }> = (props) => {

    return (<div
        className={styles.Option}
        onClick={() => props.onClick && props.onClick()}
    >
        {props.children}
        <div style={{ flex: 1, color: 'inherit' }}>
            {props.label}
        </div>
    </div>)
}

export default StartBar