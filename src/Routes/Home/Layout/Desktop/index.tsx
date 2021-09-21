import React from 'react';

import { useAppSelector } from '../../../../Redux/hooks';
import ProgramSelector from '../../../../programs';

import ProgramIcon from '../../../../components/atoms/ProgramIcon';

import { Window } from '../../../../Redux/reducers/windows';

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
    const { desktop } = useAppSelector(state => state.storage);

    return (
        <div style={{ display: 'flex', flex: 1, backgroundColor: '#018281' }}>
            <div>
                {desktop.files?.map((file, index: number) =>
                    <ProgramIcon
                        key={`di_${file.slug}_${index}`}
                        tabIndex={index}
                        {...file}
                        {...defaultPrograms[file.slug]}
                    />
                )}
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