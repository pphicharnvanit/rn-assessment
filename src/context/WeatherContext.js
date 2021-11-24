import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../api/weatherApi";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather", async (unitsTemp) => {
    try {
      const { data } = await weatherApi.get('/onecall',
        {
          params: {
            // lat: currentLocation.latitude,
            lat: 13.938346,
            // lon: currentLocation.longitude,
            lon: 100.3161132,
            exclude: 'minutely,hourly,alerts',
            units: unitsTemp
          }
        });
      return data;
    } catch (error) {
      console.log(error);
    }

  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { value: [null], isLoading: false },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { } = weatherSlice.actions;

export default weatherSlice.reducer;