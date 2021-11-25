import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, Image, View, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import TempButtonGroup from "../components/TempButtonGroup";

import theme from "../context/theme";
import DailyForecastCard from "../components/DailyForecastCard";
import DailyForecastList from "../components/DailyForecastList";

const HomeScreen = () => {
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    if (weatherState.loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <ScrollView>
            <View style={{
                backgroundColor: themeApp.background,
                paddingHorizontal: 15,
                paddingTop: 10,
                flex: 1,
            }}>
                {weatherState?.value ?
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
                        <FlatList
                            data={weatherState.value.daily}
                            keyExtractor={item => item.dt}
                            marginTop={25}
                            renderItem={({ item }) => {
                                return (
                                    <DailyForecastList itemList={item} />)
                            }}
                        />
                    </>
                    : <Text>No data yet</Text>}
            </View >
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    loader: {
        marginTop: 'auto',
        marginBottom: 'auto'
    },
});

export default HomeScreen;