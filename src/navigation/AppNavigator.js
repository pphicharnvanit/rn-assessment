import React, { useEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer, DarkTheme, DefaultTheme } from "@react-navigation/native";
import * as Location from "expo-location";
import * as Network from 'expo-network';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchCurrentWeather } from "../context/WeatherContext";
import { setCurrentLocation } from "../context/SettingsContext";
import { addLocation } from "../context/InterestLocationContext";
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
    const weatherState = useSelector((state) => state.weather);
    const interestLocationState = useSelector((state) => state.interestLocation);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;
    const { getItem, setItem } = AsyncStorage;
    const settingsValue = settingsState.value;

    async function fetchMyData() {
        const weatherData = await getItem("weatherData");
        if (weatherData != null) {
            weatherState.value = JSON.parse(weatherData);
        } else {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            dispatch(setCurrentLocation({ location: { lat: location.coords.latitude, lon: location.coords.longitude } }));
            dispatch(fetchCurrentWeather(settingsValue));
            storeData();
        }
    }

    async function storeData() {
        try {
            await setItem("weatherData", JSON.stringify(weatherState.value));
        } catch (error) {
            alert(error);
        }
    }

    useEffect(() => {
        fetchMyData();
    }, []);

    async function saveInterestLocation() {
        try {
            let arr = [];
            const locationList = await getItem("locationList");
            if (locationList != null) {
                console.log('ee');
                arr = JSON.parse(locationList);
            }
            arr.push(weatherState.value)
            dispatch(addLocation(arr));
            await setItem("locationList", JSON.stringify(arr));
            console.log(interestLocationState.value);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <NavigationContainer theme={settingsValue.isDarkMode === true ? DarkTheme : DefaultTheme}>
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
                                <TouchableOpacity onPress={() => {
                                    Alert.alert(
                                        "Saving Location",
                                        "Do you want to save this location?",
                                        [
                                            {
                                                text: "Yes",
                                                onPress: () => {
                                                    saveInterestLocation();
                                                },
                                            },
                                            {
                                                text: "Cancel",
                                            },
                                        ],
                                        {
                                            cancelable: true,
                                        }
                                    );
                                }}>
                                    <MaterialIcons name="add-location" size={24} color={themeApp.active} style={{ marginRight: 20 }} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={async () => {
                                    const network = await Network.getNetworkStateAsync();
                                    if (!network.isConnected) {
                                        return Alert.alert("No internet connection", "Please check your internet connection and try again.");
                                    }
                                    dispatch(fetchCurrentWeather(settingsValue));
                                    storeData();
                                }}>
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