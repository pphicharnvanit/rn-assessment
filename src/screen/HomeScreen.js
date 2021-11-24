import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StyleSheet, Text, Button, Image, View, ScrollView } from 'react-native';
import { Card, ListItem, Icon } from 'react-native-elements'
import useWeather from "../hooks/useWeather";
import { fetchCurrentWeather } from "../context/WeatherContext";
import * as Location from "expo-location";
import { setCurrentLocation } from "../context/SettingsContext";

import TempButtonGroup from "../components/TempButtonGroup";

import theme from "../context/theme";

const HomeScreen = () => {
    const dispatch = useDispatch();
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    const [expanded, setExpanded] = useState(false);

    // useEffect(async () => {
    //     const { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //         console.log(status);
    //         return;
    //     }
    //     const location = await Location.getCurrentPositionAsync({});
    //     dispatch(setCurrentLocation({ location: { lat: location.coords.latitude, lon: location.coords.longitude } }));
    // });

    return (
        <ScrollView>
            <View style={{
                backgroundColor: themeApp.background,
                paddingHorizontal: 15,
                paddingTop: 10,
                flex: 1,
            }}>
                {weatherState.value ?
                    <>
                        <Text style={{
                            fontSize: 22,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: themeApp.textTitle
                        }}>
                            {weatherState.value.timezone}
                        </Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@4x.png` }} style={{ height: 200, width: 200 }} />
                            <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeApp.textTitle }}>{weatherState.value.current.temp} °{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                                <TempButtonGroup />
                            </View>
                        </View>
                        {/* <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} height={160} >
                            <Card containerStyle={{ width: 150, height: 140, justifyContent: 'center', elevation: 4, borderRadius: 8 }}>
                                <Card.Title>clouds</Card.Title>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@2x.png` }} style={{ height: 50, width: 100, alignSelf: 'center' }} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>Tue</Text>
                                <Text style={{ textAlign: 'right' }}>84°{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                            </Card>
                            <Card containerStyle={{ width: 150, height: 140, justifyContent: 'center', elevation: 4, borderRadius: 8 }}>
                                <Card.Title>clouds</Card.Title>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@2x.png` }} style={{ height: 50, width: 100, alignSelf: 'center' }} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>Tue</Text>
                                <Text style={{ textAlign: 'right' }}>84°{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                            </Card>
                            <Card containerStyle={{ width: 150, height: 140, justifyContent: 'center', elevation: 4, borderRadius: 8 }}>
                                <Card.Title>clouds</Card.Title>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@2x.png` }} style={{ height: 50, width: 100, alignSelf: 'center' }} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>Tue</Text>
                                <Text style={{ textAlign: 'right' }}>84°{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                            </Card>
                        </ScrollView>
                        <ListItem.Accordion
                            content={
                                <>
                                    <Icon name="place" size={30} />
                                    <ListItem.Content>
                                        <ListItem.Title>List Accordion</ListItem.Title>
                                    </ListItem.Content>
                                </>
                            }
                            isExpanded={expanded}
                            onPress={() => {
                                setExpanded(!expanded);
                            }}
                            backgroundColor="{{ 'red' }}"
                        >
                            <Card containerStyle={{ width: 150, height: 140, justifyContent: 'center', elevation: 4, borderRadius: 8 }}>
                                <Card.Title>clouds</Card.Title>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@2x.png` }} style={{ height: 50, width: 100, alignSelf: 'center' }} />
                                <Text style={{ textAlign: 'center', marginTop: 10 }}>Tue</Text>
                                <Text style={{ textAlign: 'right' }}>84°{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                            </Card>
                        </ListItem.Accordion> */}
                    </>
                    : <Text>No data yet</Text>}
                <Button onPress={() => {
                    dispatch(fetchCurrentWeather(settingsState.value.unitsTemp));
                }}
                    title="get weather info" />
            </View >
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    weatherForecast: {
        flexDirection: 'row',
    }
});

export default HomeScreen;