import React from "react";
import { Text, View, StyleSheet } from 'react-native';
import { useSelector } from "react-redux";
import theme from "../context/theme";
import { MaterialIcons } from '@expo/vector-icons';

const NotFoundPage = () => {
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;
    return (
        <View style={[styles.bg, { backgroundColor: themeApp.background }]}>
            <MaterialIcons name="location-off" size={192} color={themeApp.textTitle} />
            <Text style={[styles.text, { color: themeApp.textTitle }]}>No Data Found</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    bg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 24
    }
});

export default NotFoundPage;