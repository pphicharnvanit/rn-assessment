import { useState } from "react";
import { weatherApi } from "../api/weatherApi";
import * as Location from "expo-location";

const useWeather = () => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  const getWeather = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log(status);
        return;
      }
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location.coords);

      const { data } = await weatherApi.get('/onecall',
        {
          params: {
            lat: currentLocation.latitude,
            // lat: 13.938346,
            lon: currentLocation.longitude,
            // lon: 100.3161132,
            exclude: 'minutely,hourly,alerts',
            units: 'imperial'
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