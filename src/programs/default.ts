import IEIcon from '../assets/icons/msie.png'
import NotepadIcon from '../assets/icons/notepad.png'
import SettingsIcon from '../assets/icons/settings.png'
import AboutMeIcon from '../assets/icons/aboutme.png'
import ExplorerIcon from '../assets/icons/directory.png'
import TicTacToeIcon from '../assets/icons/tic-tac-toe.png';

const programs: {
    [slug: string]: {
        name: string,
        icon: string,
        overrideSingleInstance?: boolean,
        extension?: string
    }
} = {
    ie: {
        name: 'Internet Explorer',
        icon: IEIcon,
        extension: '.html'
    },
    notepad: {
        name: 'Notepad',
        icon: NotepadIcon,
        overrideSingleInstance: true,
        extension: '.txt'
    },
    settings: {
        name: 'Settings',
        icon: SettingsIcon
    },
    aboutme: {
        name: 'About Me',
        icon: AboutMeIcon
    },
    explorer: {
        name: "Explorer",
        icon: ExplorerIcon
    },
    tictactoe: {
        name: "Tic Tac Toe",
        icon: TicTacToeIcon
    }
}

export default programs