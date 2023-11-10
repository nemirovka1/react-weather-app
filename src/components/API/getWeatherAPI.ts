import axios from "axios";
import { WEATHER_API_URL,WEATHER_API_KEY } from "../constants";

export const getCurrentWeather = async (city: string) => {
    return axios.get(`${WEATHER_API_URL}/current?city=${city}&key=${WEATHER_API_KEY}`);
};
export const getWeatherForecast = async (city: string, days: number) => {
    return axios.get(`${WEATHER_API_URL}/forecast/daily?city=${city}&days=${days}&key=${WEATHER_API_KEY}`);
};
