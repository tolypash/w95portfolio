import React from 'react';
import { useAppDispatch } from '../../Redux/hooks';

import Window from '../../components/organisms/Window';

import { Window as WindowProps } from '../../Redux/reducers/windows';

const SettingsProgram = (props: WindowProps) => {
    const dispatch = useAppDispatch()

    return (
        <Window
            {...props}
            dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
            draggable
            resizable
        >

        </Window>
    )
}

export default SettingsProgram