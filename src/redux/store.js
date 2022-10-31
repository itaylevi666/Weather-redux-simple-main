import axios from "axios";
import { configureStore } from "@reduxjs/toolkit";

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchAllCities = createAsyncThunk(
	"weather/fetchAllCities",
	async (cityCode) => {
		const API_DOMAIN = "http://dataservice.accuweather.com";
		const API_KEY = "MTAqTViPORYHxRQxaCGdiGjlP4f0uSAn";

		const forecast = await axios.get(
			`${API_DOMAIN}/forecasts/v1/daily/5day/${cityCode}?apikey=${API_KEY}&details=true`
		);

		return forecast.data;
	}
);
export const weatherSlice = createSlice({
	name: "weather",
	initialState: {
		data: {},
		status: "idle", // 'idle' | 'loading' | 'succeeded' | 'failed',
		error: null,
		value: 0,
	},
	reducers: {},
	extraReducers: {
		[fetchAllCities.pending]: (state, action) => {
			state.status = "loading";
		},
		[fetchAllCities.fulfilled]: (state, action) => {
			state.status = "succeeded";

			state.data[action.meta.arg] = action.payload;
		},
		[fetchAllCities.rejected]: (state, action) => {
			state.status = "failed";
			state.error = action.error.message;
		},
	},
});

export const store = configureStore({
	reducer: {
		weather: weatherSlice.reducer,
	},
});

export const selectAllCities = (state) => state.weather.data;
