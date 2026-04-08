import { fetchWeatherApi } from 'openmeteo';

/**
 * Fetches the human-readable location name (reverse geocoding) for given coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<string>} The localized city or area name
 */
export const getLocationName = async (lat, lon) => {
    try {
        const response = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`);
        const data = await response.json();
        return data.city || data.locality || data.principalSubdivision || "Unknown Location";
    } catch (e) {
        console.error("Geocoding failed", e);
        return "Unknown Location";
    }
};

/**
 * Fetches the current weather data from Open-Meteo for given coordinates.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} An object containing mapped current weather variables
 */
export const getWeatherData = async (lat, lon) => {
    const params = {
        latitude: [lat],
        longitude: [lon],
        current: 'temperature_2m,weather_code,wind_speed_10m,wind_direction_10m,relative_humidity_2m,surface_pressure,is_day',
        hourly: 'temperature_2m,precipitation',
        daily: 'weather_code,temperature_2m_max,temperature_2m_min',
        timezone: 'auto'
    };
    
    const url = 'https://api.open-meteo.com/v1/forecast';
    const responses = await fetchWeatherApi(url, params);
    
    const response = responses[0];
    const current = response.current();

    return {
        temperature: Math.round(current.variables(0).value()),
        weatherCode: current.variables(1).value(),
        windSpeed: Math.round(current.variables(2).value()),
        windDirection: current.variables(3).value(),
        humidity: Math.round(current.variables(4).value()),
        pressure: Math.round(current.variables(5).value()),
        isDay: current.variables(6).value()
    };
};
