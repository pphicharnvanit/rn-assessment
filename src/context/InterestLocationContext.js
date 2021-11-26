import { createSlice } from "@reduxjs/toolkit";

const interestLocationSlice = createSlice({
    name: "interestLocation",
    initialState: {
        value: [null]
    },
    reducers: {
        addLocation: (state, action) => {
            state.value = action.payload;
        },
        removeLocation: (state, action) => {
            // state.value.unitsTemp = action.payload;
        },
    },
});

export const {
    addLocation,
    removeLocation
} = interestLocationSlice.actions;

export default interestLocationSlice.reducer;
