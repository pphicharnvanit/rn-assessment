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
        <View style={{
            backgroundColor: themeApp.background,
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1
        }}>
            <Text style={{ fontSize: 24, justifyContent: "flex-start", color: themeApp.textTitle }}>Display</Text>
            <View style={styles.row}>
                <FontAwesome name="sun-o" size={24} color={themeApp.textTitle} />
                <Text style={{ flex: 2, justifyContent: 'flex-start', paddingStart: 20, color: themeApp.textBody }}>Dark Theme</Text>
                <DarkModeSwitch />
            </View>
        </View >
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        alignItems: 'center'
    }
});

export default SettingsScreen;