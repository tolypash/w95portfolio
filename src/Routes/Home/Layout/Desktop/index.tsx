import React from 'react';

import { useAppSelector } from '../../../../Redux/hooks';
import ProgramSelector from '../../../../programs';

import ProgramIcon from '../../../../components/atoms/ProgramIcon';
import FolderIcon from '../../../../components/atoms/FolderIcon';

import { Window } from '../../../../Redux/reducers/windows';

import { isDirectory } from '../../../../Redux/reducers/storage';

import { getDirectory } from '../../../../utils/storage';

import styles from './Desktop.module.scss';

import { default as defaultPrograms } from '../../../../programs/default';

interface IProps {
    windows:
    {
        allWindows: Window[],
        focused: {
            id: string,
            zIndex: number
        }
    }
}

const Desktop = (props: IProps) => {
    const storage = useAppSelector(state => state.storage)
    const wallpaper = useAppSelector(state => state.settings.wallpaper)

    const desktop = getDirectory(storage, 'Desktop')

    const desktopWallpaperStyle: React.HTMLAttributes<HTMLDivElement>['style'] = wallpaper.color ?
        { backgroundColor: wallpaper.value } :
        { backgroundImage: `url(${wallpaper.value})`, backgroundSize: 'cover', backgroundPosition: 'center' }

    return (
        <div className={styles.MainContainer} style={{ ...desktopWallpaperStyle }}>
            {desktop?.children.map((file, index: number) => {
                if (!isDirectory(file)) {
                    return <ProgramIcon
                        key={`di_${file.slug}_${index}`}
                        tabIndex={index}
                        {...file}
                        sdata={{ ...defaultPrograms[file.slug], ...file.sdata, ref: '/Desktop' }}
                    />
                } else {
                    return <FolderIcon
                        key={`di_explorer_${index}`}
                        tabIndex={index}
                        {...file}
                        sdata={{ name: file.name, slug: 'explorer', ...file.sdata, ref: '/Desktop' }}
                    />
                }
            })}

            {props.windows.allWindows.map(window =>
                <ProgramSelector
                    key={`p_${window.id}`}
                    {...window}
                />
            )}
        </div>
    )
}

export default Desktop;