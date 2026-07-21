import { useEffect, useState } from "react";
import {
  FaCloud,
  FaCloudRain,
  FaDroplet,
  FaSun,
  FaWind,
} from "react-icons/fa6";

import { getWeather } from "../../api/WeatherApi";

function WeatherCard({ latitude, longitude }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWeather() {
      try {
        setLoading(true);

        const data = await getWeather(latitude, longitude);

        setWeatherData(data);
      } catch (error) {
        console.error("Error loading weather:", error);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    }

    if (latitude && longitude) {
      loadWeather();
    } else {
      setLoading(false);
      setWeatherData(null);
    }
  }, [latitude, longitude]);

  if (loading) {
    return <section className="weather-card">Cargando tiempo...</section>;
  }

  if (!weatherData) {
    return <section className="weather-card">Tiempo no disponible</section>;
  }

  const { weather } = weatherData;

  const getWeatherInfo = (code) => {
    if (code === 0) {
      return {
        label: "Despejado",
        icon: <FaSun />,
      };
    }

    if (code >= 1 && code <= 3) {
      return {
        label: "Parcialmente nublado",
        icon: <FaCloud />,
      };
    }

    if (code >= 51 && code <= 82) {
      return {
        label: "Lluvia",
        icon: <FaCloudRain />,
      };
    }

    return {
      label: "Nublado",
      icon: <FaCloud />,
    };
  };

  const weatherInfo = getWeatherInfo(weather.weather_code);

  return (
    <section className="weather-card">
      <div className="weather-card-header">
        <div>
          <span className="weather-card-eyebrow">Tiempo actual</span>

          <h2>Ubicación de la planta</h2>
        </div>

        <div className="weather-card-icon">{weatherInfo.icon}</div>
      </div>

      <div className="weather-card-main">
        <strong>{Math.round(weather.temperature_2m)}°</strong>

        <span>{weatherInfo.label}</span>
      </div>

      <div className="weather-card-details">
        <div className="weather-detail">
          <FaDroplet />

          <div>
            <span>Humedad</span>
            <strong>{weather.relative_humidity_2m}%</strong>
          </div>
        </div>

        <div className="weather-detail">
          <FaWind />

          <div>
            <span>Viento</span>
            <strong>{weather.wind_speed_10m} km/h</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WeatherCard;
