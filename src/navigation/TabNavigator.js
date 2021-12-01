import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Location from "expo-location";
import * as Network from 'expo-network';
import { getData, storeData } from "../context/StorageContext";

import { fetchCurrentWeather, getWeatherData } from "../context/WeatherContext";
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

export default function TabNavigator({ navigation }) {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const settingsValue = settingsState.value;
    const weatherState = useSelector((state) => state.weather);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    async function fetchMyData() {
        const weatherData = await getData();
        if (weatherData != null) {
            dispatch(getWeatherData(JSON.parse(weatherData)));
        } else {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            const location = await Location.getCurrentPositionAsync({});
            dispatch(setCurrentLocation({ location: { lat: location.coords.latitude, lon: location.coords.longitude } }));
            dispatch(fetchCurrentWeather(settingsValue));
            await storeData(weatherState.value);
        }
    }

    useEffect(() => {
        fetchMyData();
    }, []);

    async function saveInterestLocation() {
        try {
            dispatch(addLocation(weatherState.value));
            alert("Save location Successfully!")
        } catch (error) {
            alert(error);
        }
    }

    return (
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
                        <View style={styles.row}>
                            <TouchableOpacity onPress={() => navigation.navigate('Search')}>
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
    );
}
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})