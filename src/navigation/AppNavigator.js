import React, { useContext } from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screen/HomeScreen';
import MyLocationScreen from '../screen/MyLocationScreen';
import SettingsScreen from '../screen/SettingsScreen';
import themeContext from "../config/themeContext";

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const theme = useContext(themeContext);
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                title: 'Wheater Forecast',
                headerTintColor: "white",
                headerTitleAlign: "center",
                headerStyle: { backgroundColor: theme.header },
                tabBarStyle: { backgroundColor: theme.tabBar },
                tabBarActiveTintColor: theme.active,
                tabBarInactiveTintColor: theme.inActive,
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
    );
}