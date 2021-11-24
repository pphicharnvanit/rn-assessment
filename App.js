import React from 'react';
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import AppNavigator from './src/navigation/AppNavigator';
import settingsReducer from "./src/context/SettingsContext";
import weatherReducer from "./src/context/WeatherContext";

const store = configureStore({
  reducer: {
    settings: settingsReducer,
    weather: weatherReducer,
  },
});

export default () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};