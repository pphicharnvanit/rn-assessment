import React from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, View } from 'react-native';
import DarkModeSwitch from "../components/DarkModeSwitch";
import { FontAwesome } from '@expo/vector-icons';
import theme from "../context/theme";

const SettingsScreen = () => {
    const settingsState = useSelector((state) => state.settings);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;

    return (
        <View style={[styles.bg, { backgroundColor: themeApp.background, }]}>
            <Text style={[styles.title, { color: themeApp.textTitle }]}>Display</Text>
            <View style={styles.row}>
                <FontAwesome name="sun-o" size={24} color={themeApp.textTitle} />
                <Text style={[styles.body, { color: themeApp.textBody }]}>Dark Theme</Text>
                <DarkModeSwitch />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    bg: {
        paddingHorizontal: 15,
        paddingTop: 10,
        flex: 1
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        justifyContent: "flex-start",
    },
    body: {
        flex: 2,
        justifyContent: 'flex-start',
        paddingStart: 20,
    }
});

export default SettingsScreen;