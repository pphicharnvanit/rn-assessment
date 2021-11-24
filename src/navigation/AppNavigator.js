import React from "react";
import { useSelector } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";

import HomeScreen from "../screen/HomeScreen";
import MyLocationScreen from "../screen/MyLocationScreen";
import SettingsScreen from "../screen/SettingsScreen";

import theme from "../context/theme";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    return (
        <NavigationContainer theme={settingsState.value.isDarkMode === true ? DarkTheme : DefaultTheme}>
            <Tab.Navigator
                initialRouteName="Home"
                screenOptions={{
                    title: 'Wheater Forecast',
                    headerTintColor: "white",
                    headerTitleAlign: "center",
                    headerStyle: { backgroundColor: themeApp.header },
                    tabBarStyle: { backgroundColor: themeApp.tabBar },
                    tabBarActiveTintColor: themeApp.active,
                    tabBarInactiveTintColor: themeApp.inActive,
                }}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="home" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="MyLocation"
                    component={MyLocationScreen}
                    options={{
                        tabBarLabel: "MyLocation",
                        tabBarIcon: ({ color, size }) => (
                            <Entypo name="location-pin" size={24} color={color} />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons name="ios-settings-sharp" size={24} color={color} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}