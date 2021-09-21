import IEIcon from './assets/icons/msie.png'
import NotepadIcon from './assets/icons/notepad.png'
import AboutMeIcon from './assets/icons/aboutme.png'

const programs: {
    [slug: string]: {
        name: string,
        icon: string,
        overrideSingleInstance?: boolean,
        extension: string
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
    }
}

export default programs