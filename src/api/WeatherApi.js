import axios from "axios";

const weatherApi = axios.create({
  baseURL: "https://api.open-meteo.com/v1",
});

export async function getWeather(latitude, longitude) {
  const response = await weatherApi.get("/forecast", {
    params: {
      latitude,
      longitude,
      current:
        "temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m,is_day",
      timezone: "auto",
    },
  });

  return {
    weather: response.data.current,
    units: response.data.current_units,
  };
}
