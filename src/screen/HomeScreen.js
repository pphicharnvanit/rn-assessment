import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, Image, View, ActivityIndicator, FlatList } from 'react-native';

import theme from "../context/theme";
import TempButtonGroup from "../components/TempButtonGroup";
import DailyForecastCard from "../components/DailyForecastCard";
import DailyForecastList from "../components/DailyForecastList";
import NotFoundPage from "../components/NotFoundPage";

const HomeScreen = () => {
    const settingsState = useSelector((state) => state.settings);
    const weatherState = useSelector((state) => state.weather);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    if (weatherState.loading) {
        return <ActivityIndicator size="large" style={styles.loader} />;
    }

    return (
        <View style={[styles.bg, { backgroundColor: themeApp.background, }]}>
            {weatherState?.value
                ? <FlatList
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
                            <Text style={[styles.title, { color: themeApp.textTitle }]}>
                                {weatherState.value.timezone}
                            </Text>
                            <View style={{ flexDirection: 'row' }}>
                                <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherState.value.current.weather[0].icon}@4x.png` }} style={{ height: 160, width: 200 }} />
                                <View style={styles.column}>
                                    <Text style={[styles.temp, { color: themeApp.textTitle }]}>{parseInt(weatherState.value.current.temp)} °{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                                    <TempButtonGroup />
                                </View>
                            </View>
                            <DailyForecastCard data={weatherState.value.daily} />
                        </>
                    } />
                : <>
                    <NotFoundPage />
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
    bg: {
        paddingHorizontal: 10,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        alignSelf: 'center',
    },
    column: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    temp: {
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default HomeScreen;