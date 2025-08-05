import { useState, useEffect } from "react";
import {
  WiHumidity,
  WiFog,
  WiDaySunny,
  WiAlien,
} from "react-icons/wi";
import { FaWind } from "react-icons/fa";

function CurrentWidget({ city }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [temperature, setTemperature] = useState(0);
  const [windSpeed, setWindSpeed] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [visibility, setVisibility] = useState(0);
  const [airQuality, setAirQuality] = useState("Moderate");

  const base_url = "https://api.openweathermap.org/data/2.5";
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `${base_url}/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) throw new Error("City not found");

      const data = await response.json();
      setHumidity(data.main.humidity);
      setWindSpeed(data.wind.speed);
      setVisibility(data.visibility);
      setTemperature(data.main.temp);
    } catch (err) {
      setError(err.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (city) fetchWeather();
  }, [city]);

  return (
    <div className="max-w-xs mx-auto mt-10  text-gray-900 rounded-2xl  p-6">
      {loading && (
        <div className="text-center text-white/70 animate-pulse">Loading...</div>
      )}

      {error && (
        <div className="text-center text-red-200 font-semibold">{error}</div>
      )}

      {!loading && !error && (
        <>
          <div className="flex flex-col items-center mb-6">
            <WiDaySunny className="text-6xl mb-2 text-yellow-300" />
            <div className="text-5xl font-bold">
              {Math.round(temperature)}°C
            </div>
            <div className="text-lg mt-1">{city}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <WiAlien className="text-xl text-yellow-200" />
              <span>Air: {airQuality}</span>
            </div>
            <div className="flex items-center gap-2">
              <FaWind className="text-xl text-blue-200" />
              <span>Wind: {windSpeed} m/s</span>
            </div>
            <div className="flex items-center gap-2">
              <WiHumidity className="text-xl text-cyan-100" />
              <span>Humidity: {humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <WiFog className="text-xl text-white/70" />
              <span>Vis: {(visibility / 1000).toFixed(1)} km</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default CurrentWidget;
