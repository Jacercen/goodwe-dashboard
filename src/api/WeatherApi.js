import axios from "axios";

const geocodingApi = axios.create({
  baseURL: "https://geocoding-api.open-meteo.com/v1",
});

const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export async function getWeatherByCity(city) {
  // Primero buscamos las coordenadas de la ciudad
  const locationResponse = await geocodingApi.get("/search", {
    params: {
      name: city,
      count: 1,
      language: "es",
      format: "json",
    },
  });

  const location = locationResponse.data.results?.[0];

  if (!location) {
    throw new Error(`No se ha encontrado la ciudad: ${city}`);
  }

  // Después obtenemos el tiempo con esas coordenadas
  const weatherResponse = await weatherApi.get("/forecast", {
    params: {
      latitude: location.latitude,
      longitude: location.longitude,
      current:
        "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
      timezone: "auto",
    },
  });

  return {
    location,
    weather: weatherResponse.data.current,
    units: weatherResponse.data.current_units,
  };
}
