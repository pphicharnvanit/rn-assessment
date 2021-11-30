import { createSlice } from "@reduxjs/toolkit";

const interestLocationSlice = createSlice({
    name: "interestLocation",
    initialState: {
        value: []
    },
    reducers: {
        addLocation: (state, action) => {
            const location = {
                id: Math.floor(Math.random() * 99999),
                location: action.payload
            }
            state.value = [...state.value, location];
        },
        deleteLocation: (state, action) => {
            state.value = state.value.filter((item) => item.id !== action.payload);
        },
    },
});

export const {
    addLocation,
    deleteLocation
} = interestLocationSlice.actions;

export default interestLocationSlice.reducer;
