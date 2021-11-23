import React, { useState, useContext } from "react";
import { StyleSheet, Text, View, Switch } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { EventRegister } from 'react-native-event-listeners';
import themeContext from "../config/themeContext";

const SettingsScreen = () => {
    const theme = useContext(themeContext);
    const [mode, setMode] = useState(false);

    return (
        <View style={{
            backgroundColor: theme.background,
            paddingHorizontal: 15,
            paddingTop: 10,
            flex: 1
        }}>
            <Text style={{ fontSize: 24, justifyContent: "flex-start", color: theme.textTitle }}>Display</Text>
            <View style={styles.row}>
                <FontAwesome name="sun-o" size={24} color={theme.textTitle} />
                <Text style={{ flex: 2, justifyContent: 'flex-start', paddingStart: 20, color: theme.textBody }}>Dark Theme</Text>
                <Switch
                    value={mode}
                    onValueChange={(value) => {
                        setMode(value);
                        EventRegister.emit("changeTheme", value);
                    }}
                    trackColor={{ true: "#5AC6AC", false: "#767577" }}
                    thumbColor={mode ? "#A9F4DE" : "#f4f3f4"}
                />
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