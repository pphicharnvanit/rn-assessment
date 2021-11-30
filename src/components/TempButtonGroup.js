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

    return (
        <ButtonGroup
            onPress={async (index) => {
                const units = index == 0 ? 'metric' : 'imperial';
                dispatch(updateTemp(`${units}`));
                const params = {
                    "location": {
                        "lat": settingsState.value.location.lat,
                        "lon": settingsState.value.location.lon,
                    },
                    "unitsTemp": `${units}`
                };
                dispatch(fetchCurrentWeather(params));
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