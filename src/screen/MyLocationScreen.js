import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import theme from "../context/theme";

const MyLocationScreen = () => {
    const settingsState = useSelector((state) => state.settings);
    const interestLocationState = useSelector((state) => state.interestLocation);
    const themeApp = settingsState.value.isDarkMode === true ? theme.dark : theme.light;
    return (
        <View style={{ backgroundColor: themeApp.background, flex: 1 }}>
            <TouchableOpacity onPress={() =>
                // navigation.navigate('Show')
                console.log(interestLocationState)
            }>
                <View style={styles.row}>
                    <Entypo style={styles.icon} name="location-pin" color={themeApp.textIcon} />
                    <Text style={{
                        fontSize: 18,
                        flex: 2,
                        marginStart: 20,
                        color: themeApp.textBody
                    }}>Mountain View</Text>
                    <TouchableOpacity onPress={() => {
                        Alert.alert(
                            "Removing Location",
                            "Do you want to remove this location?",
                            [
                                {
                                    text: "Yes",
                                    onPress: () => {
                                        console.log('yes');
                                    },
                                },
                                {
                                    text: "Cancel",
                                },
                            ],
                            {
                                cancelable: true,
                            }
                        );
                    }}>
                        <Feather style={styles.icon} name="trash" color={themeApp.textIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        borderBottomWidth: 1,
        paddingHorizontal: 10,
        borderColor: 'gray'
    },
    icon: {
        fontSize: 24,
        paddingEnd: 10
    }
});

export default MyLocationScreen;