import React from 'react';
import { useAppDispatch, useAppSelector } from '../../Redux/hooks';
import useIsMobile from '../../hooks/useIsMobile';

import Button from '../../components/atoms/Button';

import Window from '../../components/organisms/Window';

import { Window as WindowProps } from '../../Redux/reducers/windows';
import { ISettings } from '../../Redux/reducers/settings';

import styles from './Settings.module.scss';

import SplashImage from '../../assets/img/splash.png';
import WindowsXP from '../../assets/img/wallpapers/windows-xp-default.jpeg';

const COLORS = [
    '#818181',
    '#c3c3c3',
    '#fdffff',
    '#010081',
    '#008080',
    '#000000',
    '#ff0081',
    '#ef9c44',
    '#7b484b'
]

const WALLPAPERS = [
    { name: 'Default', src: SplashImage },
    { name: 'Windows XP', src: WindowsXP }
]

const SettingsProgram: React.FC<WindowProps> = (props) => {
    const dispatch = useAppDispatch();
    const settings = useAppSelector(state => state.settings);
    const isMobile = useIsMobile();

    const [wallpaper, setWallpaper] = React.useState<ISettings['wallpaper']>()

    React.useEffect(() => {
        setWallpaper(settings.wallpaper)
    }, [settings.wallpaper])

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
            style={{
                minWidth: !isMobile ? 500 : undefined,
            }}
        >
            <div style={{ margin: 15 }}>
                <div className={styles.Preview}>
                    {!wallpaper?.color ?
                        <img src={wallpaper?.value} />
                        : <div style={{ backgroundColor: wallpaper?.value }} />
                    }
                </div>
                <div style={{ marginTop: 20, marginBottom: 10 }}>
                    Select Wallpaper
                    <div style={{ display: 'flex', gap: 10 }}>
                        <div className={styles.Wallpapers}>
                            {WALLPAPERS.map(w => (
                                <div className={styles.WallpaperRow} onClick={() => setWallpaper({ color: false, value: w.src })}>
                                    {w.name}
                                </div>
                            ))}
                        </div>
                        <div className={styles.Colors}>
                            {COLORS.map(color => (
                                <Color
                                    color={color}
                                    onClick={() => setWallpaper({ color: true, value: color })}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse', gap: 10 }}>
                    <Button>Apply</Button>
                    <Button onClick={() => dispatch({ type: 'windows/kill', payload: props.id })}>Cancel</Button>
                    <Button>OK</Button>
                </div>
            </div>
        </Window>
    )
}

const Color: React.FC<{ color: string, onClick?: () => void }> = (props) => {
    return <div className={styles.Color} style={{ backgroundColor: props.color }} onClick={props.onClick} />
}

export default SettingsProgram