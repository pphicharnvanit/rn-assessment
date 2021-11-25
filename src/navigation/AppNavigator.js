import React, { useEffect } from "react";
import { View, TouchableOpacity } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as Location from "expo-location";

import { fetchCurrentWeather } from "../context/WeatherContext";
import { setCurrentLocation } from "../context/SettingsContext";
import HomeScreen from "../screen/HomeScreen";
import MyLocationScreen from "../screen/MyLocationScreen";
import SettingsScreen from "../screen/SettingsScreen";

import theme from "../context/theme";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    useEffect(() => {
        fetchMyData();
    }, []);

    async function fetchMyData() {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            return;
        }
        const location = await Location.getCurrentPositionAsync({});
        dispatch(setCurrentLocation({ location: { lat: location.coords.latitude, lon: location.coords.longitude } }));
        dispatch(fetchCurrentWeather(settingsState.value.unitsTemp));
    }

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
                        headerTitleAlign: 'left',
                        headerRight: () => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => console.log('load')}>
                                    <AntDesign name="search1" size={24} color={themeApp.active} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => console.log('load')}>
                                    <MaterialIcons name="add-location" size={24} color={themeApp.active} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => dispatch(fetchCurrentWeather(settingsState.value.unitsTemp))}>
                                    <MaterialIcons name="refresh" size={24} color={themeApp.active} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                            </View>
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