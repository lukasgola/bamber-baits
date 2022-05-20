import React from 'react';

import AppNavigator from './routes/StackNavigator';

import { MenuProvider } from 'react-native-popup-menu';

export default function App() {

  return (
    <MenuProvider>
       <AppNavigator />
    </MenuProvider>
  );
}