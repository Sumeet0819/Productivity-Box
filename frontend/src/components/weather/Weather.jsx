import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Gauge, Droplets, Sun, Moon, CloudRain, CloudSnow, CloudLightning, Loader2, MapPin } from 'lucide-react';
import { useGeolocated } from 'react-geolocated';
import { getLocationName, getWeatherData } from '../../services/weatherService';

const getWeatherDetails = (code, isDay) => {
    const isNight = isDay === 0;
    const ClearIcon = isNight ? Moon : Sun;

    if (code === 0) return { label: 'Clear', icon: ClearIcon, accent: 'text-[var(--primary)]' };
    if ([1, 2, 3].includes(code)) return { label: 'Cloudy', icon: Cloud, accent: 'text-[var(--on-surface-variant)]' };
    if ([45, 48].includes(code)) return { label: 'Fog', icon: Cloud, accent: 'text-[var(--on-surface-variant)]' };
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', icon: CloudRain, accent: 'text-sky-500' };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: CloudSnow, accent: 'text-sky-500' };
    if ([95, 96, 99].includes(code)) return { label: 'Thunder', icon: CloudLightning, accent: 'text-purple-500' };
    return { label: 'Unknown', icon: Cloud, accent: 'text-[var(--on-surface-variant)]' };
};

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: { enableHighAccuracy: false },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        const loadData = async (lat, lon) => {
            try {
                const [locationName, weather] = await Promise.all([
                    getLocationName(lat, lon),
                    getWeatherData(lat, lon)
                ]);
                setWeatherData({ locationName, ...weather });
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (coords) {
            loadData(coords.latitude, coords.longitude);
        } else if (isGeolocationAvailable === false || isGeolocationEnabled === false) {
            loadData(52.54, 13.41);
        }
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    if (loading) {
        return (
            <div className="w-full min-h-[220px] rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)] flex flex-col items-center justify-center text-[var(--on-surface-variant)]">
                <Loader2 className="animate-spin text-[var(--primary)]" size={22} />
                <p className="mt-2 text-sm font-medium text-center">
                    {!isGeolocationEnabled ? 'Waiting for location...' : 'Loading weather...'}
                </p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className="w-full min-h-[220px] rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)] flex flex-col items-center justify-center text-[var(--on-surface-variant)]">
                <p className="text-sm font-bold">Failed to load weather</p>
            </div>
        );
    }

    const { label, icon: WeatherIcon, accent } = getWeatherDetails(weatherData.weatherCode, weatherData.isDay);

    return (
        <div className="w-full min-h-[220px] rounded-[2rem] bg-[var(--surface-container-lowest)] p-4 shadow-[var(--shadow-focus)]">
            <div className="flex items-start justify-between gap-2">
                <div>
                    <p className="text-[0.55rem] uppercase tracking-[0.35em] text-[var(--on-surface-variant)]">Weather</p>
                    <h2 className="mt-1 text-sm font-semibold tracking-tight text-[var(--on-surface)]">
                        {weatherData.locationName}
                    </h2>
                    <div className="mt-1 flex items-center gap-1.5 text-[0.85rem] text-[var(--on-surface-variant)]">
                        <WeatherIcon size={14} className={accent} />
                        <span>{label}</span>
                    </div>
                </div>
                <div className="rounded-[1.5rem] bg-[var(--surface-container-low)] p-2 text-[var(--on-surface)]">
                    <WeatherIcon className={accent} size={18} strokeWidth={2} />
                </div>
            </div>

            <div className="mt-5 flex items-center justify-center text-center">
                <p className="text-[2rem] font-semibold tracking-tight text-[var(--on-surface)]">
                    {weatherData.temperature}°
                </p>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2 rounded-[2rem] bg-[var(--surface-container-low)] p-2.5 text-center text-[var(--on-surface-variant)]">
                <div className="space-y-1">
                    <Wind size={14} className="text-[var(--primary)] mx-auto" />
                    <p className="text-[0.55rem] uppercase tracking-[0.35em]">Wind</p>
                    <p className="text-[0.75rem] font-semibold text-[var(--on-surface)]">{weatherData.windSpeed} km/h</p>
                </div>
                <div className="space-y-1">
                    <Gauge size={14} className="text-[var(--primary)] mx-auto" />
                    <p className="text-[0.55rem] uppercase tracking-[0.35em]">Pressure</p>
                    <p className="text-[0.75rem] font-semibold text-[var(--on-surface)]">{weatherData.pressure} mb</p>
                </div>
                <div className="space-y-1">
                    <Droplets size={14} className="text-[var(--primary)] mx-auto" />
                    <p className="text-[0.55rem] uppercase tracking-[0.35em]">Humidity</p>
                    <p className="text-[0.75rem] font-semibold text-[var(--on-surface)]">{weatherData.humidity}%</p>
                </div>
            </div>
        </div>
    );
};

export default Weather;