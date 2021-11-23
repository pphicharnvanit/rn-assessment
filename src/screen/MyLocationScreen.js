import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import themeContext from "../config/themeContext";

const MyLocationScreen = () => {
    const theme = useContext(themeContext);
    return (
        <View style={{ backgroundColor: theme.background, flex: 1 }}>
            <TouchableOpacity onPress={() =>
                // navigation.navigate('Show')
                console.log('Show')
            }>
                <View style={styles.row}>
                    <Entypo style={styles.icon} name="location-pin" color={theme.textIcon} />
                    <Text style={{
                        fontSize: 18,
                        flex: 2,
                        marginStart: 20,
                        color: theme.textBody
                    }}>Mountain View</Text>
                    <TouchableOpacity onPress={() => console.log('delete')}>
                        <Feather style={styles.icon} name="trash" color={theme.textIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() =>
                // navigation.navigate('Show')
                console.log('Show')
            }>
                <View style={styles.row}>
                    <Entypo style={styles.icon} name="location-pin" color={theme.textIcon} />
                    <Text style={{
                        fontSize: 18,
                        flex: 2,
                        marginStart: 20,
                        color: theme.textBody
                    }}>Mountain View</Text>
                    <TouchableOpacity onPress={() => console.log('delete')}>
                        <Feather style={styles.icon} name="trash" color={theme.textIcon} />
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