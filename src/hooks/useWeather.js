import { useState, useEffect } from "react";
import { weatherApi } from "../api/weatherApi";
import * as Location from "expo-location";

const useWeather = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const getWeather = async ({ index }) => {
    const unit = index == 0 ? 'metric' : 'imperial';
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      setCurrentLocation(await Location.getCurrentPositionAsync({}))

      const { data } = await weatherApi.get('/onecall',
        {
          params: {
            lat: currentLocation.coords.latitude,
            lon: currentLocation.coords.longitude,
            exclude: 'minutely,hourly,alerts',
            units: unit
          }
        });

      setWeatherInfo(data);
    } catch (error) {
      console.log(error);
    }
  }

  return ({ weatherInfo, getWeather });
}

export default useWeather;