import IEIcon from '../assets/icons/msie.png'
import NotepadIcon from '../assets/icons/notepad.png'
import SettingsIcon from '../assets/icons/settings.png'

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
        overrideSingleInstance: false,
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
        icon: SettingsIcon,
        overrideSingleInstance: false,
    }
}

export default programs