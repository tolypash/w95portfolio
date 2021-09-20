import { makeRandomID } from "../../utils/common";

export type Window = {
    id: string,
    name: string,
    slug: string,
    openedAt: string,
    zIndex: number,
    minimized: boolean
};

const initialState: {
    allWindows: Window[],
    focused?: {
        zIndex: number,
        id: string
    }
} = {
    allWindows: []
}

export default function windowsReducer(state = initialState, action: any) {
    const { allWindows, focused } = state

    switch (action.type) {
        case 'windows/open': {
            const { name, slug, overrideSingleInstance } = action.payload;

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

                console.log(index)
                if (index > -1) {
                    return {
                        ...state,
                        focused: {
                            id: allWindows[index].id,
                            zIndex: (focused?.zIndex || 0) + 1
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
                        zIndex: (focused?.zIndex || 0) + 1,
                        minimized: false
                    }
                ],
                focused: {
                    id: id,
                    zIndex: (focused?.zIndex || 0) + 1
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
                    zIndex: zIndex
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