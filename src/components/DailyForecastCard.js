import React from "react";
import { useSelector } from "react-redux";
import { Card } from 'react-native-elements'
import { StyleSheet, Text, FlatList, Image } from 'react-native';
import moment from "moment";

import theme from "../context/theme";

const DailyForecastCard = ({ data }) => {
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    return (
        <FlatList
            data={data}
            keyExtractor={item => item.dt}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
                const t = new Date(item.dt * 1000);
                const formatted = moment(t).format("ddd");
                return (
                    <Card containerStyle={[styles.card, { backgroundColor: themeApp.cardBackground }]}>
                        <Card.Title style={{ color: themeApp.textTitle }}>{item.weather[0].description}</Card.Title>
                        <Image source={{ uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png` }} style={styles.img} />
                        <Text style={styles.day, { color: themeApp.textTitle }}>{formatted}</Text>
                        <Text style={styles.temp, { color: themeApp.textTitle }}>{parseInt(item.temp.day)}°{settingsState.value.unitsTemp == 'metric' ? 'C' : 'F'}</Text>
                    </Card>
                );
            }}
        />
    );
}

const styles = StyleSheet.create({
    card: {
        width: 150,
        height: 140,
        marginBottom: 5,
        justifyContent: 'center',
        elevation: 4,
        borderRadius: 8,
        borderWidth: 0
    },
    img: {
        height: 50,
        width: 100,
        alignSelf: 'center'
    },
    day: {
        textAlign: 'center',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 14
    },
    temp: {
        textAlign: 'right',
        fontSize: 12,
        fontWeight: 'bold'
    }
});

export default DailyForecastCard;