interface IType {
    name: string,
    createdAt?: string,
    sdata?: {
        name?: string,
        icon?:string,
        overrideSingleInstance?: boolean,
        extension?: string,
        [x: string]: any
    }
}

export interface Directory extends IType {
    type: 'dir',
    children: Array<File | Directory>,
}

export interface File extends IType {
    type: 'file',
    slug: string
}

export function isDirectory(dir: IType): dir is Directory {
    return (<Directory>dir).type === 'dir';
}

export function isFile(file: IType): file is File {
    return (<File>file).slug !== undefined;
}

const initialState: Directory = {
    name: 'C:',
    type: 'dir',
    children: [{
        name: 'Desktop',
        type: 'dir',
        children: [{
            type: 'file',
            name: 'Internet Explorer',
            slug: 'ie',
        },
        {
            type: 'file',
            name: 'Notepad',
            slug: 'notepad'
        },
        {
            type: 'file',
            name: 'About Me',
            slug: 'aboutme'
        },
        // TEST DATA
        {
            type: 'dir',
            name: 'New Folder',
            children: [{
                type: 'dir',
                name: 'Testing',
                children: [{
                    type: 'file',
                    name: 'Test',
                    slug: 'notepad'
                }]
            }]
        }]
    }]
}

export default function storageReducer(state = initialState, action: any) {

    switch (action.type) {
        case 'storage/add': {
            return state
        }
        case 'storage/delete': {
            return state
        }
        case 'storage/save': {
            return state
        }
        case 'storage/create': {
            return state
        }
        default:
            return state
    }
}