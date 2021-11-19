import React, { useState, useEffect } from 'react';
import { NavigationContainer, DarkTheme, DefaultTheme } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from './src/config/themeContext';
import theme from './src/config/theme';
import AppNavigator from './src/navigation/AppNavigator';

export default () => {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener("changeTheme", (data) => {
      setMode(data);
    });

    return () => {
      EventRegister.removeEventListener(eventListener);
    }
  })
  return (
    <themeContext.Provider value={mode === true ? theme.dark : theme.light} >
      <NavigationContainer theme={mode === true ? DarkTheme : DefaultTheme}>
        <AppNavigator />
      </NavigationContainer>
    </themeContext.Provider>
  );
};