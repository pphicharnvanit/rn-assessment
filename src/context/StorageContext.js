import React from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { getItem, setItem } = AsyncStorage;

export const storeData = async (data) => {
    try {
        if (data) {
            await setItem("weatherData", JSON.stringify(data));
        }
    } catch (error) {
        alert(error);
    }
}

export const getData = async () => {
    try {
        return await getItem("weatherData") ?? null;
    } catch (error) {
        alert(error);
    }
}