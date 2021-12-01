import React from "react";
import { useSelector } from "react-redux";
import { List } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import moment from "moment";

import theme from "../context/theme";

const DailyForecastList = ({ itemList }) => {
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;
    const [expanded, setExpanded] = React.useState(false);

    const handlePress = () => setExpanded(!expanded);

    const t = new Date(itemList.dt * 1000);
    const formatted = moment(t).format("dddd, MMMM DD, YYYY");
    const units = settingsState.value.unitsTemp == 'metric' ? 'C' : 'F';

    return (
        <List.Section style={{ marginHorizontal: 1, marginBottom: 1 }}>
            <List.Accordion
                title={<Text style={[styles.title, { color: themeApp.textTitle }]}>{formatted}</Text>}
                expanded={expanded}
                onPress={handlePress}
                style={{ backgroundColor: themeApp.cardBackground }}
            >
                <List.Item style={{ backgroundColor: themeApp.cardBackground }} title={
                    <View style={{ flexDirection: 'row' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={[styles.text, { color: themeApp.textTitle }]}>{itemList.weather[0].description}</Text>
                            <Text style={{ color: themeApp.textTitle }}>Feel like  {parseInt(itemList.feels_like.day)} °{units}</Text>
                            <Text style={{ color: themeApp.textTitle }}>Min  {parseInt(itemList.temp.min)} °{units}   Max  {parseInt(itemList.temp.max)} °{units}</Text>
                            <Text style={{ color: themeApp.textTitle }}>humidity  {itemList.humidity} %</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.text, { color: themeApp.textTitle }]}>{parseInt(itemList.temp.day)} °{units}</Text>
                        </View>
                    </View>
                } />
            </List.Accordion>
        </List.Section >
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 18
    },
    text: {
        fontWeight: 'bold',
        fontSize: 16
    }
});

export default DailyForecastList;