import React from 'react';

import { Window } from '../../../../Redux/reducers/windows';

import ProgramSelector from './Programs';

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

    return (
        <div style={{ display: 'flex', flex: 1, backgroundColor: '#018281' }}>
            {props.windows.allWindows.map(window => <ProgramSelector {...window} />)}
        </div>
    )
}

export default Desktop;