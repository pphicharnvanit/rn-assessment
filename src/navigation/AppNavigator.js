import React from "react";
import { useSelector } from "react-redux";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import TabNavigator from "./TabNavigator";
import SearchScreen from "../screen/SearchScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
    const settingsState = useSelector((state) => state.settings);
    const settingsValue = settingsState.value;

    return (
        <NavigationContainer theme={settingsValue.isDarkMode === true ? DarkTheme : DefaultTheme}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Tab"
                    options={{ headerShown: false }}
                    component={TabNavigator}
                />
                <Stack.Screen name="Search" component={SearchScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
