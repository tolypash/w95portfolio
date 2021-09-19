import { makeRandomID } from "../../utils/common";

export type Window = { id: string, name: string, slug: string, openedAt: string, zIndex: number };

const initialState: { allWindows: Window[], focused?: { zIndex: number, id: string } } = { allWindows: [] }

export default function windowsReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'windows/open': {
            const { name, slug, overrideSingleInstance } = action.payload;

            if (!overrideSingleInstance) {
                const index = state.allWindows.findIndex(window => window.slug === slug)

                if (index > -1) {
                    return { ...state }
                }
            }

            let id = `${slug}-${makeRandomID(5)}`;

            let unique = false;

            while (!unique) {
                const index = state.allWindows.findIndex(window => window.id === id);

                if (index === -1) {
                    unique = true
                }
            }

            return {
                ...state,
                allWindows: [
                    ...state.allWindows,
                    {
                        id: id,
                        name: name,
                        slug: slug,
                        openedAt: new Date().toLocaleDateString(),
                        zIndex: 0
                    }
                ],
                focused: { id: id, zIndex: 0 }
            }
        }
        case 'windows/close': {
            return {
                ...state,
                allWindows: [
                    ...state.allWindows.filter(window => window.id !== action.payload)
                ]
            }
        }
        case 'windows/clear': {
            return { allWindows: [] }
        }
        default:
            return state
    }
}