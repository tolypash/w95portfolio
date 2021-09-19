import React from 'react';

import { Window } from '../../../../Redux/reducers/windows';

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

        </div>
    )
}

export default Desktop;