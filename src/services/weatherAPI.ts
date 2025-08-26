// src/services/weatherApi.ts
import type { Units, WeatherApiResponse } from "../types/weather";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

/**
 * Fetch current weather for a given city.
 * @param city - Name of the city
 * @param units - "metric" (°C) or "imperial" (°F)
 * @returns WeatherApiResponse
 */
export async function fetchCurrentWeather(
  city: string,
  units: Units = "metric"
): Promise<WeatherApiResponse> {
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY as string;
  if (!apiKey) throw new Error("Missing VITE_WEATHER_API_KEY in .env");

  const url = `${BASE_URL}/weather?q=${encodeURIComponent(
    city
  )}&appid=${apiKey}&units=${units}`;

  const res = await fetch(url);
  const data = await res.json();

  if (!res.ok) {
    const msg = typeof data?.message === "string" ? data.message : "Request failed";
    throw new Error(msg);
  }

  return data as WeatherApiResponse;
}
