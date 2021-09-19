import React from 'react';

import './App.css';

import ReduxProvider from './Redux';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <ReduxProvider>
        <Routes />
      </ReduxProvider>
    </div>
  );
}

export default App;
