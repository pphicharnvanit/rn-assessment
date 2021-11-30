import React from 'react';
import { Provider } from "react-redux";
import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import AppNavigator from './src/navigation/AppNavigator';
import settingsReducer from "./src/context/SettingsContext";
import weatherReducer from "./src/context/WeatherContext";
import interestLocationReducer from "./src/context/InterestLocationContext";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import { PersistGate } from "redux-persist/integration/react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  version: 2,
  storage: AsyncStorage,
  blacklist: ["settings"],
};

const rootReducer = combineReducers({
  settings: settingsReducer,
  weather: weatherReducer,
  interestLocation: interestLocationReducer
});

const persistedReducers = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducers,
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

let persistor = persistStore(store);

export default () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  );
};