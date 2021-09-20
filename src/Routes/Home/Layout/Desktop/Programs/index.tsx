import React from 'react';

import NotepadProgram from './Notepad';
import SettingsProgram from './Settings';
import InternetExplorerProgram from './IE';

import { Window } from '../../../../../Redux/reducers/windows';

export default function ProgramSelector(props:Window) {
    switch (props.slug) {
        case 'notepad':
            return <NotepadProgram {...props} />
        case 'settings':
            return <SettingsProgram {...props} />
        case 'ie':
            return <InternetExplorerProgram {...props} />
    }

    return null
}