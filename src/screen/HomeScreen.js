import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, Image, View, ActivityIndicator, FlatList } from 'react-native';

import theme from "../context/theme";
import TempButtonGroup from "../components/TempButtonGroup";
import DailyForecastCard from "../components/DailyForecastCard";
import DailyForecastList from "../components/DailyForecastList";
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    if (weatherState.loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={{
            backgroundColor: themeApp.background,
            paddingHorizontal: 10,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            {weatherState?.value ?
                <FlatList
                    data={weatherState.value.daily}
                    keyExtractor={item => item.dt}
                    marginTop={5}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => {
                        return (
                            <DailyForecastList itemList={item} />)
                    }}
                    ListHeaderComponent={
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
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@4x.png` }} style={{ height: 160, width: 200 }} />
                                <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: themeApp.textTitle }}>{parseInt(weatherState.value.current.temp)} °{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                                    <TempButtonGroup />
                                </View>
                            </View>
                            <DailyForecastCard data={weatherState.value.daily} />
                        </>
                    }
                />
                : <>
                    <MaterialIcons name="location-off" size={192} color={themeApp.textTitle} />
                    <Text style={{ color: themeApp.textTitle, fontWeight: 'bold', fontSize: 24 }}>No Data Found</Text>
                </>
            }
        </View >
    );
};

const styles = StyleSheet.create({
    loader: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default HomeScreen;