import React from 'react';

import NotepadProgram from './Notepad';
import SettingsProgram from './Settings';
import InternetExplorerProgram from './IE';
import AboutMeProgram from './AboutMe';
import Explorer from './Explorer';

import TicTacToe from './games/TicTacToe';

import { Window } from '../Redux/reducers/windows';

export default function ProgramSelector(props: Window & { data?: any }) {
    switch (props.slug) {
        case 'notepad':
            return <NotepadProgram {...props} />
        case 'settings':
            return <SettingsProgram {...props} />
        case 'ie':
            return <InternetExplorerProgram {...props} />
        case 'aboutme':
            return <AboutMeProgram {...props} />
        case 'explorer':
            return <Explorer {...props} />
        case 'tictactoe':
            return <TicTacToe {...props} />
    }

    return null
}