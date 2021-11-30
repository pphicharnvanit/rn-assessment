import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, View, TouchableOpacity } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getWeatherData } from "../context/WeatherContext";
import LocationListItem from "../components/LocationListItem";

import theme from "../context/theme";
import { FlatList } from "react-native-gesture-handler";
import { MaterialIcons } from '@expo/vector-icons';

const MyLocationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const interestLocationState = useSelector((state) => state.interestLocation);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    const { getItem, setItem } = AsyncStorage;

    async function storeData() {
        try {
            await setItem("weatherData", JSON.stringify(weatherState.value));
            navigation.goBack();
        } catch (error) {
            alert(error);
        }
    }

    return (
        <>
            {
                interestLocationState?.value
                    ? < View style={{ backgroundColor: themeApp.background, flex: 1 }}>
                        <FlatList
                            data={interestLocationState.value}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={() => {
                                        dispatch(getWeatherData(item.location));
                                        storeData();
                                    }}>
                                        <LocationListItem data={item} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    : <View style={{ backgroundColor: themeApp.background, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <MaterialIcons name="location-off" size={192} color={themeApp.textTitle} />
                        <Text style={{ color: themeApp.textTitle, fontWeight: 'bold', fontSize: 24 }}>No Data Found</Text>
                    </View>
            }
        </>
    );
};

export default MyLocationScreen;