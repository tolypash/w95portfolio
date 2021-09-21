import IEIcon from './assets/icons/msie.png'
import NotepadIcon from './assets/icons/notepad.png'

const programs: {
    [slug: string]: {
        name: string,
        icon: string,
        overrideSingleInstance?: boolean,
    }
} = {
    ie: {
        name: 'Internet Explorer',
        icon: IEIcon,
        overrideSingleInstance: false
    },
    notepad: {
        name: 'Notepad',
        icon: NotepadIcon,
        overrideSingleInstance: true
    }
}

export default programs