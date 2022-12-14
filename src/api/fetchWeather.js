import axios from "axios";

const coordinatesUrl = 'https://api.openweathermap.org/geo/1.0/direct'
const currentUrl = 'https://api.openweathermap.org/data/2.5/weather'
const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast'
const API_KEY = '93306e7b1c2d7e5a1cfcd5271a751dd0'

export const getCoordinates = async (query) => {
    const { data } = await axios.get(coordinatesUrl, {
        params: {
            q: query,
            units: 'metric',
            appid: API_KEY
        }
    })
    const coordinates = {lat: data[0].lat, lon: data[0].lon}
    return coordinates
}


export const fetchForecastWeather = async (coordinates) => {
    const { data } = await axios.get(forecastUrl, {
        params: {
            lat: coordinates.lat,
            lon: coordinates.lon,
            appid: API_KEY
        }
    })
    return data
}

export const fetchCurrentWeather = async (coordinates) => {
    const { data } = await axios.get(currentUrl, {
        params: {
            lat: coordinates.lat,
            lon: coordinates.lon, 
            appid: API_KEY
        }
    })
    return data
}