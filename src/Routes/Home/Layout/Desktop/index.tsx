import React from 'react';

import { Window } from '../../../../Redux/reducers/windows';

interface IProps {
    windows: Window[]
}

const Desktop = (props: IProps) => {

    return (
        <div style={{ display: 'flex', flex: 1, backgroundColor: '#018281' }}>

        </div>
    )
}

export default Desktop;