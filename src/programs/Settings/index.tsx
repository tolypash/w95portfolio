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

    const inputFile = React.useRef<HTMLInputElement | null>(null)

    const [wallpaper, setWallpaper] = React.useState<ISettings['wallpaper']>()

    React.useEffect(() => {
        setWallpaper(settings.wallpaper)
    }, [settings.wallpaper])

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            style={{
                minWidth: !isMobile ? 500 : undefined,
            }}
        >
            <div style={{ margin: 15 }}>
                <div className={styles.Preview}>
                    {!wallpaper?.color ?
                        <img src={wallpaper?.value} alt='wallpaper preview' />
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

                            <div className={styles.WallpaperRow} onClick={() => inputFile.current?.click()}>
                                Browse...
                                <input
                                    style={{ display: 'none' }}
                                    type='file'
                                    id='wallpaperFile'
                                    ref={inputFile}
                                    accept={"image/*"}
                                    onChange={(e) => {
                                        const files = e.target.files
                                        if (files) {
                                            const url = URL.createObjectURL(files[0])
                                            setWallpaper({ color: false, value: url })
                                        }
                                    }}
                                />
                            </div>
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
                    <Button onClick={() => dispatch({ type: 'settings/edit', payload: { wallpaper: wallpaper } })}>Apply</Button>
                    <Button onClick={() => dispatch({ type: 'windows/kill', payload: props.id })}>Cancel</Button>
                    <Button onClick={() => {
                        dispatch({ type: 'settings/edit', payload: { wallpaper: wallpaper } })
                        dispatch({ type: 'windows/kill', payload: props.id })
                    }}>
                        OK
                    </Button>
                </div>

                <span>
                    This website was built with React and Redux.{' '}
                    <a href='https://github.com/tolypash/w95portfolio' target='_blank' rel='noreferrer'>Check the code on GitHub</a>
                </span>
            </div>
        </Window>
    )
}

const Color: React.FC<{ color: string, onClick?: () => void }> = (props) => {
    return <div className={styles.Color} style={{ backgroundColor: props.color }} onClick={props.onClick} />
}

export default SettingsProgram