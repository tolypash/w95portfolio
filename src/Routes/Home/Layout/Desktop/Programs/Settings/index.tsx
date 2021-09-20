import React from 'react';
import { useAppDispatch } from '../../../../../../Redux/hooks';

import Window from '../../../../../../components/organisms/Window';

import { Window as WindowProps } from '../../../../../../Redux/reducers/windows';

const SettingsProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window 
        name='Settings' 
        dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })} 
        draggable
        resizable
        >

        </Window>
    )
}

export default SettingsProgram