import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'

import windowsReducer, { Window } from './reducers/windows';

export interface RootState {
    windows: Window[];
}

const store = configureStore({
    reducer: {
        windows: windowsReducer
    },
})

const ReduxProvider: React.FC = props => {
    return <Provider store={store}>
        {props.children}
    </Provider>
}

export type AppDispatch = typeof store.dispatch

export default ReduxProvider;