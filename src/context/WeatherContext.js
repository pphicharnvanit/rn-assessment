import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { weatherApi } from "../api/weatherApi";

export const fetchCurrentWeather = createAsyncThunk(
  "weather/fetchCurrentWeather", async (settingsValue) => {
    try {
      const { data } = await weatherApi.get('/onecall',
        {
          params: {
            lat: settingsValue.location.lat,
            // lat: 13.938346,
            lon: settingsValue.location.lon,
            // lon: 100.3161132,
            exclude: 'minutely,hourly,alerts',
            units: settingsValue.unitsTemp
          }
        });
      return data;
    } catch (error) {
      throw error;
    }

  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState: { value: null, isLoading: false },
  reducers: {
    getWeatherData: (state, action) => {
      state.value = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentWeather.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCurrentWeather.fulfilled, (state, action) => {
        state.value = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCurrentWeather.rejected, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { getWeatherData } = weatherSlice.actions;

export default weatherSlice.reducer;