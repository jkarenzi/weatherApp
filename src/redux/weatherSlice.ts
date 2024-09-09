import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from '../services/api'
import { InitialState, IQuery, WeatherData } from "../types/Weather";


export const fetchWeatherData = createAsyncThunk<WeatherData, IQuery>('weather/fetchData', async({key, query}, thunkAPI) => {
    try{
        const response = await axios.get("", {
            params:{
                key,
                query,
                days: '7'
            }
        })

        return response.data
    }catch(err){
        return thunkAPI.rejectWithValue(err)
    }
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState: {
        error:"",
        isLoading: false,
        current: null,
        location: null,
        forecast: null,
        days: []
    } as InitialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(fetchWeatherData.pending, (state) => {
            state.error = ""
            state.isLoading = true
        })
        .addCase(fetchWeatherData.fulfilled, (state, action) => {
            state.current = action.payload.current
            state.location = action.payload.location
            state.forecast = action.payload.forecast.forecastday[0]
            state.days = action.payload.forecast.forecastday
            state.isLoading = false
        })
        .addCase(fetchWeatherData.rejected, (state, action) => {
            state.isLoading = false
            state.error = action.payload as string
            alert(action.payload as string)
        })
    }
})

export default weatherSlice.reducer