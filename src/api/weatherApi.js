import axios from "axios";

export const weatherApi = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5',
    // params: { appid: 'ee4bea97afaf1839f450adeb7f50257d' } //personal account
    params: { appid: '7d300022ae19e8381446a2c0aebd53d4' } //accenture account
});