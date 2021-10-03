import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import windowsReducer, { Window } from './reducers/windows';
import storageReducer, { Directory } from './reducers/storage';
import settingsReducer, { ISettings } from './reducers/settings';

export interface RootState {
    windows: {
        allWindows: Window[],
        focused: {
            id: string,
            zIndex: number
        }
    },
    storage: Directory,
    settings: ISettings
}

const store = configureStore({
    reducer: {
        windows: windowsReducer,
        storage: storageReducer,
        settings: settingsReducer
    }
})

const ReduxProvider: React.FC = props => {
    return <Provider store={store}>
        {props.children}
    </Provider>
}

export type AppDispatch = typeof store.dispatch

export default ReduxProvider;