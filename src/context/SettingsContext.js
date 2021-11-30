import { createSlice } from "@reduxjs/toolkit";

const settingsSlice = createSlice({
    name: "settings",
    initialState: {
        value: {
            isDarkMode: true,
            location: { lat: 13.938346, lon: 100.3161132 },
            unitsTemp: "metric"
        }
    },
    reducers: {
        updateDarkMode: (state, action) => {
            state.value.isDarkMode = action.payload;
        },
        setCurrentLocation: (state, action) => {
            state.value = action.payload;
        },
        updateTemp: (state, action) => {
            state.value.unitsTemp = action.payload;
        },
    },
});

export const {
    updateDarkMode,
    setCurrentLocation,
    updateTemp
} = settingsSlice.actions;

export default settingsSlice.reducer;
