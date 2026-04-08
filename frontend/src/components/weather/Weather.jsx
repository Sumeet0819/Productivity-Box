import React, { useState, useEffect } from 'react';
import { Cloud, Wind, Gauge, Droplets, Sun, Moon, CloudRain, CloudSnow, CloudLightning, Loader2, MapPin } from 'lucide-react';
import { useGeolocated } from 'react-geolocated';
import { getLocationName, getWeatherData } from '../../services/weatherService';

import bgSunny from '../../assests/images/Sunny countryside stroll path.png';
import bgDayClear from '../../assests/images/Serene countryside path under blue skies.png';
import bgNight from '../../assests/images/Moonlit path through the forest.png';
import bgRain from '../../assests/images/Rainy stroll in the city.png';
import bgSnow from '../../assests/images/Snowy village in twilight glow.png';
import bgStorm from '../../assests/images/Electric storm over city skyline.png';

const getWeatherDetails = (code, isDay) => {
    const isNight = isDay === 0;
    const ClearIcon = isNight ? Moon : Sun;

    // Use clear blue skies for clear day, and sunny stroll path for slightly cloudy/regular daytime
    if (code === 0) return { label: 'Clear', icon: ClearIcon, bg: isNight ? bgNight : bgDayClear };
    if ([1, 2, 3].includes(code)) return { label: 'Cloudy', icon: Cloud, bg: !isNight ? bgNight : bgDayClear };
    if ([45, 48].includes(code)) return { label: 'Fog', icon: Cloud, bg: bgRain };
    if ([51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return { label: 'Rain', icon: CloudRain, bg: bgRain };
    if ([71, 73, 75, 77, 85, 86].includes(code)) return { label: 'Snow', icon: CloudSnow, bg: bgSnow };
    if ([95, 96, 99].includes(code)) return { label: 'Thunder', icon: CloudLightning, bg: bgStorm };

    return { label: 'Unknown', icon: Cloud, bg: isNight ? bgNight : bgDayClear };
};

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
        positionOptions: {
            enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
    });

    useEffect(() => {
        const loadData = async (lat, lon) => {
            try {
                // Fetch location and weather concurrently for better performance
                const [locationName, weather] = await Promise.all([
                    getLocationName(lat, lon),
                    getWeatherData(lat, lon)
                ]);

                setWeatherData({
                    locationName,
                    ...weather
                });
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        if (coords) {
            // Geolocation is unblocked and acquired
            loadData(coords.latitude, coords.longitude);
        } else if (isGeolocationAvailable === false || isGeolocationEnabled === false) {
            // Geolocation is blocked, disabled by user, or not supported by browser
            // Fallback to Berlin
            loadData(52.54, 13.41);
        }
        // If neither, then the geolocation is still verifying / user hasn't accepted yet. We keep it in the "Loading" state.
    }, [coords, isGeolocationAvailable, isGeolocationEnabled]);

    if (loading) {
        return (
            <div className='w-full min-w-[280px] max-w-[320px] aspect-[4/5] flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-gray-500'>
                <Loader2 className="animate-spin text-gray-400" size={32} />
                <p className="mt-4 text-sm font-medium text-center">
                    {!isGeolocationEnabled ? "Waiting for location..." : "Loading weather..."}
                </p>
            </div>
        );
    }

    if (!weatherData) {
        return (
            <div className='w-full min-w-[280px] max-w-[320px] aspect-[4/5] flex flex-col items-center justify-center p-8 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 text-gray-500'>
                <p className="text-sm font-medium">Failed to load weather</p>
            </div>
        );
    }

    const { label, icon: WeatherIcon, bg } = getWeatherDetails(weatherData.weatherCode, weatherData.isDay);

    return (
        <div
            className='w-full min-w-[280px] max-w-[320px] aspect-[4/5] flex flex-col justify-between p-7 rounded-xl shadow-[0_12px_40px_rgb(0,0,0,0.15)] border border-white/20 relative overflow-hidden text-white'
        >
            {/* Background Image Setup */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-all duration-1000"
                style={{ backgroundImage: `url('${bg}')` }}
            />
            {/* Dark Overlay for Text Legibility */}
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 via-black/10 to-black/60" />

            {/* Top Section */}
            <div className="flex flex-row justify-between items-start w-full relative z-10">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-1.5 drop-shadow-md">
                        <MapPin size={16} className="text-white/90" />
                        <span className="font-semibold text-lg tracking-tight">{weatherData.locationName}</span>
                    </div>
                    <span className="text-white/90 font-medium text-sm flex items-center gap-1.5 drop-shadow">
                        <WeatherIcon size={14} className="text-white/90" /> {label}
                    </span>
                </div>
                <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl shadow-sm border border-white/20">
                    <WeatherIcon className="text-white drop-shadow-sm" size={28} strokeWidth={1.5} />
                </div>
            </div>

            {/* Middle Section: Temperature */}
            <div className="flex flex-col justify-center my-4 relative z-10">
                <div className="font-bold text-7xl tracking-tighter drop-shadow-lg">
                    {weatherData.temperature}°
                </div>
            </div>

            {/* Bottom Section: Details */}
            <div className="flex flex-row justify-between items-center w-full bg-white/20 backdrop-blur-md p-4 rounded-2xl border border-white/20 relative z-10 shadow-sm">
                <div className="flex flex-col items-center gap-1">
                    <Wind size={18} className="text-white/90 drop-shadow-sm" />
                    <p className="text-xs font-bold text-white drop-shadow-sm">{weatherData.windSpeed} <span className="text-[10px] text-white/80 font-medium tracking-wide">km/h</span></p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col items-center gap-1">
                    <Gauge size={18} className="text-white/90 drop-shadow-sm" />
                    <p className="text-xs font-bold text-white drop-shadow-sm">{weatherData.pressure} <span className="text-[10px] text-white/80 font-medium tracking-wide">mb</span></p>
                </div>
                <div className="w-px h-8 bg-white/20" />
                <div className="flex flex-col items-center gap-1">
                    <Droplets size={18} className="text-white/90 drop-shadow-sm" />
                    <p className="text-xs font-bold text-white drop-shadow-sm">{weatherData.humidity}<span className="text-[10px] text-white/80 font-medium tracking-wide">%</span></p>
                </div>
            </div>
        </div>
    );
};

export default Weather;