import { makeRandomID } from "../../utils/common";

export type Directory = {
    files?: File[]
    createdAt?: string
};

export type File = {
    slug: string,
    data?: any
}

const initialState: {
    [dirName: string]: Directory
} = {
    desktop: {
        files: [
            { slug: 'ie' },
            { slug: 'notepad' }
        ]
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
        default:
            return state
    }
}