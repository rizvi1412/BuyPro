import React from 'react';
import ReduxProvider from './src/redux-saga/provider/provider';
import {AppNavigator} from './src/components/AppNavigator';

function App() {
  return (
    <ReduxProvider>
      <AppNavigator />
    </ReduxProvider>
  );
}

export default App;
