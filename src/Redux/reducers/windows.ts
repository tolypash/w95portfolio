import { makeRandomID } from "../../utils/common";

import { default as defaultPrograms } from '../../programs/default';

export interface Window {
    id: string,
    name: string,
    slug: string,
    openedAt: string,
    zIndex: number,
    minimized: boolean,
    ref?: string,
    sdata?: any
};

const initialState: {
    allWindows: Window[],
    focused?: {
        zIndex: number,
        id: string
    }
} = {
    allWindows: [{
        id: 'aboutme-00000',
        name: 'About Me',
        slug: 'aboutme',
        openedAt: '',
        zIndex: 1,
        minimized: false
    }],
    focused: {
        zIndex: 1,
        id: 'aboutme-00000'
    }
}

export default function windowsReducer(state = initialState, action: any) {
    const { allWindows, focused } = state

    switch (action.type) {
        case 'windows/open': {
            const { slug, sdata } = action.payload
            const { name, overrideSingleInstance } = defaultPrograms[slug];

            let id = `${slug}-${makeRandomID(5)}`;

            let unique = false;

            while (!unique) {
                const index = allWindows.findIndex(window => window.id === id);

                if (index === -1) {
                    unique = true
                }
            }

            if (!overrideSingleInstance) {
                const index = allWindows.findIndex(window => window.slug === slug)

                const temp = [...allWindows]

                temp[index] = { ...temp[index], minimized: false }

                if (index > -1) {
                    return {
                        ...state,
                        allWindows: temp,
                        focused: {
                            id: allWindows[index].id,
                            zIndex: (focused?.zIndex || 2) + 1
                        }
                    }
                }
            }

            return {
                ...state,
                allWindows: [
                    ...allWindows,
                    {
                        id: id,
                        name: name,
                        slug: slug,
                        openedAt: new Date().toLocaleDateString(),
                        zIndex: (focused?.zIndex || 2) + 1,
                        minimized: false,
                        sdata: sdata
                    }
                ],
                focused: {
                    id: id,
                    zIndex: (focused?.zIndex || 2) + 1
                }
            }
        }
        case 'windows/kill': {
            return {
                ...state,
                allWindows: [
                    ...allWindows.filter(window => window.id !== action.payload)
                ]
            }
        }
        case 'windows/edit': {
            const { id } = action.payload;

            const index = allWindows.findIndex(x => x.id === id)

            if (index > -1) {
                const temp = [...allWindows]

                temp[index] = { ...temp[index], ...action.payload }

                return {
                    ...state,
                    allWindows: [
                        ...temp
                    ]
                }
            }

            return state;
        }
        case 'windows/focus': {
            const { id } = action.payload;

            const index = allWindows.findIndex(x => x.id === id);

            let zIndex: number = 1;

            if (!allWindows[index]) {
                return state;
            }

            zIndex = allWindows[index].zIndex

            if (focused) {
                if (focused.id === id) {
                    return state
                }

                zIndex = focused.zIndex
            }

            const temp = allWindows.map(window => {
                return {
                    ...window,
                    zIndex: window.id === id ? zIndex + 1 : window.zIndex,
                    minimized: window.id === id ? false : window.minimized
                }
            })

            return {
                ...state,
                focused: {
                    id: id,
                    zIndex: zIndex + 1
                },
                allWindows: temp
            }
        }
        case 'windows/minimize': {
            const { id } = action.payload;

            const index = allWindows.findIndex(x => x.id === id);

            const temp = [...allWindows]

            temp[index] = { ...temp[index], minimized: true }

            return {
                ...state,
                focused: undefined,
                allWindows: temp
            }
        }
        case 'windows/clear': {
            return { allWindows: [] }
        }
        default:
            return state
    }
}