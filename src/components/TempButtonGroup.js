import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ButtonGroup } from 'react-native-elements';
import { fetchCurrentWeather } from "../context/WeatherContext";

import { updateTemp } from "../context/SettingsContext";

import theme from "../context/theme";

const TempButtonGroup = () => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;
    const settingsValue = settingsState.value;

    return (
        <ButtonGroup
            onPress={async (index) => {
                const units = index == 0 ? 'metric' : 'imperial';
                dispatch(updateTemp(`${units}`));
                dispatch(fetchCurrentWeather(settingsValue));
            }}
            selectedIndex={settingsState.value.unitsTemp == 'metric' ? 0 : 1}
            buttons={['Celsius ', 'Fahrenheit']}
            containerStyle={{ width: 150 }}
            selectedButtonStyle={{ backgroundColor: themeApp.selectedButton }}
            buttonStyle={{ backgroundColor: themeApp.unselectedButton }}
            selectedTextStyle={{ color: themeApp.selectedText }}
            textStyle={{ color: themeApp.unSelectedText }}
        />
    );
}

export default TempButtonGroup;