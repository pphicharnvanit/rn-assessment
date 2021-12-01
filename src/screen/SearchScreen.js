import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useSelector, useDispatch } from "react-redux";
import { fetchCurrentWeather } from "../context/WeatherContext";
import { setCurrentLocation } from "../context/SettingsContext";
import { storeData } from "../context/StorageContext";

const SearchScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);

    return (
        <GooglePlacesAutocomplete
            GooglePlacesDetailsQuery={{ fields: "geometry" }}
            fetchDetails={true}
            placeholder='Search location'
            onPress={async (data, details = null) => {
                const location = details?.geometry?.location;
                const curlocation = { location: { lat: location.lat, lon: location.lng } };
                dispatch(setCurrentLocation(curlocation));
                const params = {
                    "location": {
                        "lat": location.lat,
                        "lon": location.lng,
                    },
                    "unitsTemp": settingsState.value.unitsTemp
                };
                dispatch(fetchCurrentWeather(params));
                await storeData(weatherState.value);
                navigation.pop();
            }}

            query={{
                key: 'AIzaSyDqc47HUkVEeBzDx3JRZNZEUbi2HP55Kk0',
                language: 'en',
            }}
        />
    );
};

export default SearchScreen;