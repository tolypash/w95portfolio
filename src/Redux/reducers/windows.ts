import { makeRandomID } from "../../utils/common";

export type Window = { id: string, slug: string, openedAt: string };

const initialState: Window[] = []

export default function windowsReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'windows/open': {
            const { slug, overrideSingleInstance } = action.payload;

            if (!overrideSingleInstance) {
                const index = state.findIndex(window => window.slug === slug)

                if (index > -1) {
                    return [...state]
                }
            }

            let id = `${slug}-${makeRandomID(5)}`;

            let unique = false;

            while (!unique) {
                const index = state.findIndex(window => window.id === id);

                if (index === -1) {
                    unique = true
                }
            }

            return [
                ...state,
                {
                    id: id,
                    slug: slug,
                    openedAt: new Date().toLocaleDateString()
                }
            ]
        }
        case 'windows/close': {
            return state.filter(window => window.id !== action.payload)
        }
        case 'windows/clear': {
            return []
        }
        default:
            return state
    }
}