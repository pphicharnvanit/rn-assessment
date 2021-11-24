import React from "react";
import { Switch } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { updateDarkMode } from "../context/SettingsContext";

const DarkModeSwitch = (props) => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);

    return (
        <Switch
            value={settingsState.value.isDarkMode}
            onValueChange={(value) => {
                dispatch(updateDarkMode(!settingsState.value.isDarkMode));
            }}
            trackColor={{ true: "#5AC6AC", false: "#767577" }}
            thumbColor={settingsState.value.isDarkMode ? "#A9F4DE" : "#f4f3f4"}
        />
    );
};

export default DarkModeSwitch;
