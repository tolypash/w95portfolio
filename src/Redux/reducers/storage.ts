import { makeRandomID } from "../../utils/common";

import AboutMeIcon from '../../assets/icons/aboutme.png';
import AboutMeProgram from '../../programs/Executable/default/aboutme';

interface IType {
    name: string,
    createdAt?: string,
    data?: any
}

export interface Directory extends IType {
    type: 'dir',
    children: Array<File | Directory>,
};

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
            slug: 'exe',
            data: {
                name: 'About Me',
                icon: AboutMeIcon,
                run: AboutMeProgram
            }
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
        default:
            return state
    }
}