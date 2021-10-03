export interface ISettings {
    wallpaper: {
        color: boolean,
        value: string
    }
}

const initialState: ISettings = {
    wallpaper: {
        color: true,
        value: '#018281'
    }
}

export default function settingsReducer(state = initialState, action: any) {

    switch (action.type) {
        case 'settings/edit': {
            
            return {
                ...state,
                ...action.payload
            }
        }
        default:
            return state
    }
}