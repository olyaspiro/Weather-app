// src/App.tsx
import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import UnitToggle from "./components/UnitToggle";
import WeatherCard from "./components/WeatherCard";
import { fetchCurrentWeather } from "./services/weatherAPI";
import type { Units, WeatherApiResponse } from "./types/weather";
import "./App.css";

const DEFAULT_CITY = "Chicago";

export default function App() {
  const [city, setCity] = useState<string>(DEFAULT_CITY);
  const [units, setUnits] = useState<Units>("metric");
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load weather when city or units change
  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetchCurrentWeather(city, units);
        setData(res);
      } catch (err: any) {
        setError(err.message);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [city, units]);

  // Dynamic background based on weather
  const getBackground = () => {
    if (!data) return "linear-gradient(to bottom, #74ebd5, #acb6e5)";
    const main = data.weather[0].main.toLowerCase();
    if (main.includes("cloud")) return "linear-gradient(to bottom, #d7d2cc, #304352)";
    if (main.includes("rain")) return "linear-gradient(to bottom, #4e54c8, #8f94fb)";
    if (main.includes("clear")) return "linear-gradient(to bottom, #fbc2eb, #a6c1ee)";
    if (main.includes("snow")) return "linear-gradient(to bottom, #e0eafc, #cfdef3)";
    return "linear-gradient(to bottom, #74ebd5, #acb6e5)";
  };

  return (
    <div className="app" style={{ background: getBackground() }}>
      <div className="container">
        <header className="topbar">
          <SearchBar onSearch={(c) => setCity(c)} defaultValue={city} />
          <UnitToggle units={units} onChange={setUnits} />
        </header>

        {loading && <p className="status">Loading...</p>}
        {error && <p className="status error">⚠️ {error}</p>}
        {data && !loading && !error && <WeatherCard data={data} units={units} />}

        <footer className="footer">
          <small>
            Data by <a href="https://openweathermap.org/" target="_blank">OpenWeather</a>
          </small>
        </footer>
      </div>
    </div>
  );
}
