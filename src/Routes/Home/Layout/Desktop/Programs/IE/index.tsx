import React from 'react';
import { useAppDispatch } from '../../../../../../Redux/hooks';

import Window from '../../../../../../components/organisms/Window';

import { Window as WindowProps } from '../../../../../../Redux/reducers/windows';

const InternetExplorerProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            name='Internet Explorer'
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
        >

        </Window>
    )
}

export default InternetExplorerProgram