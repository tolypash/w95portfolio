import React from 'react';
import { useAppDispatch } from '../../../Redux/hooks';
import useIsMobile from '../../../hooks/useIsMobile';

import Window from '../../../components/organisms/Window';

import { Window as WindowProps } from '../../../Redux/reducers/windows';

/*



*/

const TicTacToe: React.FC<WindowProps> = props => {
    const dispatch = useAppDispatch()
    const isMobile = useIsMobile()

    return <Window
        {...props}
        dismiss={() => dispatch({ type: 'windows/kill', payload: props.id })}
        draggable
        resizable
        style={{
            minWidth: !isMobile ? 700 : undefined,
            height: 500
        }}
    >
        <div>

        </div>
    </Window>
}

export default TicTacToe