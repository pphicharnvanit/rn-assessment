import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { View, TouchableOpacity } from 'react-native';
import { storeData } from "../context/StorageContext";

import { getWeatherData } from "../context/WeatherContext";
import LocationListItem from "../components/LocationListItem";

import NotFoundPage from "../components/NotFoundPage";
import theme from "../context/theme";
import { FlatList } from "react-native-gesture-handler";

const MyLocationScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const interestLocationState = useSelector((state) => state.interestLocation);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    return (
        <>
            {
                interestLocationState?.value.length != 0
                    ? < View style={{ backgroundColor: themeApp.background, flex: 1 }}>
                        <FlatList
                            data={interestLocationState.value}
                            keyExtractor={item => item.id}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableOpacity onPress={async () => {
                                        dispatch(getWeatherData(item.location));
                                        await storeData(weatherState.value);
                                        navigation.goBack();
                                    }}>
                                        <LocationListItem data={item} />
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                    : <NotFoundPage />
            }
        </>
    );
};

export default MyLocationScreen;