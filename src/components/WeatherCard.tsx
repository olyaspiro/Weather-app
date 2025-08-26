// src/components/WeatherCard.tsx
import type { Units, WeatherApiResponse } from "../types/weather";

interface Props {
  data: WeatherApiResponse;
  units: Units;
}

function unitSymbol(units: Units) {
  return units === "metric" ? "°C" : "°F";
}

export default function WeatherCard({ data, units }: Props) {
  const condition = data.weather?.[0];
  const iconUrl = condition
    ? `https://openweathermap.org/img/wn/${condition.icon}@2x.png`
    : "";

  return (
    <div className="weather-card">
      <h2>
        {data.name}, {data.sys?.country}
      </h2>

      {condition && (
        <div className="condition">
          <img src={iconUrl} alt={condition.description} />
          <p>{condition.description}</p>
        </div>
      )}

      <p className="temperature">
        {Math.round(data.main.temp)} {unitSymbol(units)}
      </p>

      <div className="details">
        <p>Feels like: {Math.round(data.main.feels_like)} {unitSymbol(units)}</p>
        <p>Humidity: {data.main.humidity}%</p>
        <p>Wind: {data.wind.speed} {units === "metric" ? "m/s" : "mph"}</p>
      </div>
    </div>
  );
}
