import { reconstructObject } from '../../utils/common';

interface IType {
    name: string,
    createdAt?: string,
    sdata?: {
        name?: string,
        icon?: string,
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

function set(storage: Directory, ref: string, data: Directory | File, create: boolean) {
    const paths = ref?.split('/');

    if (paths && paths.length > 0) {
        if (!paths[0]) {
            paths.shift();
        }

        // reconstruct object so that we can mutate a deeply nested object property
        const newStorage: any = reconstructObject(storage)

        let temp: Directory = newStorage;
        let exit = false;
        let pathIndex = 0;

        let dir: Directory = temp;

        if (paths.length > 0) {
            do {
                for (let i = 0; i < temp.children.length; i++) {
                    const child = temp.children[i]
                    if (isDirectory(child) && child.name === paths[pathIndex]) {
                        temp = child

                        pathIndex++

                        if (pathIndex === paths.length) {
                            dir = child
                            exit = true
                        }
                        break;
                    }

                    if ((i + 1) === temp.children.length) {
                        // child not found
                        exit = true;
                    }
                }
            } while (!exit)
        }

        // check if there is a child with the same name
        const commonNameIndex = dir.children.findIndex(x => x.name === data.name)

        if (create) {
            if (commonNameIndex > -1) {
                // child with same name
                if (isDirectory(data)) {
                    data.name = getUniqueFolderName(dir, data.name + ' 1')
                } else {
                    alert('File with that name already exists')
                    return null;
                }
            }

            dir.children.push(data)
        } else {
            if (commonNameIndex === -1) {
                alert('File not found')
                return null
            }

            console.log(data)

            dir.children[commonNameIndex] = {
                ...dir.children[commonNameIndex],
                sdata: {
                    ...dir.children[commonNameIndex].sdata,
                    ...data
                }
            }
        }

        return newStorage
    }

    function getUniqueFolderName(dir: Directory, name: string): string {
        const commonNameIndex = dir.children.findIndex(x => x.name === name)

        if (commonNameIndex > -1) {
            const matches = dir.children[commonNameIndex].name.match(/\d+$/);

            console.log(dir.children[commonNameIndex].name)

            if (matches) {
                const number = parseInt(matches[0], 10)

                return getUniqueFolderName(dir, `New Folder ${(number ? number : 0) + 1}`)
            }
        }

        return name
    }
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
            const { name, ref, sdata } = action.payload

            const newStorage: any = set(state, ref, { name: name, ...sdata }, false)

            return newStorage
        }
        case 'storage/create': {
            const { dir, name, ref, ...rest } = action.payload

            let newChild: Directory | File = dir ?
                { type: 'dir', name: name, children: [] } :
                { type: 'file', name: name, ...rest }

            const newStorage: any = set(state, ref, newChild, true)

            if (newStorage) {
                return newStorage
            }

            return state
        }
        default:
            return state
    }
}