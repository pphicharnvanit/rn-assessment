import React, { useContext, useState } from "react";
import { StyleSheet, Text, Button, Image, View } from 'react-native';
import useWeather from "../hooks/useWeather";
import themeContext from "../config/themeContext";
import { ButtonGroup } from 'react-native-elements';

const HomeScreen = () => {
    const theme = useContext(themeContext);
    const [index, updateIndex] = useState(0);
    const { weatherInfo, getWeather } = useWeather();

    return (
        <View style={{
            backgroundColor: theme.background,
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1,
        }}>
            {weatherInfo ?
                <>
                    <Text style={{
                        fontSize: 22,
                        fontWeight: 'bold',
                        alignSelf: 'center',
                        color: theme.textTitle
                    }}>
                        {weatherInfo.timezone}
                    </Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Image source={{ uri: `http://openweathermap.org/img/wn/${weatherInfo.current.weather[0].icon}@4x.png` }} style={{ height: 200, width: 200 }} />
                        <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: theme.textTitle }}>{weatherInfo.current.temp} °{index == 0 ? 'C' : 'F'}</Text>
                            <ButtonGroup
                                onPress={(index) => updateIndex(index)}
                                selectedIndex={index}
                                buttons={['Celsius ', 'Fahrenheit']}
                                containerStyle={{ width: 150 }}
                                selectedButtonStyle={{ backgroundColor: theme.selectedButton }}
                                buttonStyle={{ backgroundColor: theme.unselectedButton }}
                                selectedTextStyle={{ color: theme.selectedText }}
                                textStyle={{ color: theme.unSelectedText }}
                            />
                        </View>
                    </View>
                </>
                : <Text>No data yet</Text>}

            <Button onPress={getWeather(1)} title="get weather info" />
        </View >
    );
};

const styles = StyleSheet.create({
});

export default HomeScreen;