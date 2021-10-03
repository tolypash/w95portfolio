import React from 'react';

import { useAppSelector } from '../../../../Redux/hooks';
import ProgramSelector from '../../../../programs';

import ProgramIcon from '../../../../components/atoms/ProgramIcon';

import { Window } from '../../../../Redux/reducers/windows';

import { isDirectory } from '../../../../Redux/reducers/storage';

import { getDirectory } from '../../../../utils/storage';

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

    const desktopWallpaperStyle:React.HTMLAttributes<HTMLDivElement>['style'] = wallpaper.color ? 
    { backgroundColor: wallpaper.value } : 
    { backgroundImage: `url(${wallpaper.value})`, backgroundSize: 'cover', backgroundPosition: 'center'}

    return (
        <div style={{ display: 'flex', flex: 1, ...desktopWallpaperStyle }}>
            <div>
                {desktop?.children.map((file, index: number) => {
                    if (!isDirectory(file)) {
                        return <ProgramIcon
                            key={`di_${file.slug}_${index}`}
                            tabIndex={index}
                            {...file}
                            sdata={{ ...defaultPrograms[file.slug], ...file.sdata, ref: '/Desktop' }}
                        />
                    } else {

                    }
                })}
            </div>

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