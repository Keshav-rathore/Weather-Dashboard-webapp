import { useState, useEffect } from "react";
import DayCard from "./DayCard";

function ForecastWidget({ city }) {
  const [forecastList, setForecastList] = useState([]);

  useEffect(() => {
    if (!city) return;

    const fetchForecastData = async () => {
      const base_url = "https://api.openweathermap.org/data/2.5";
      const apiKey = import.meta.env.VITE_WEATHER_API_KEY;


      try {
        const response = await fetch(
          `${base_url}/forecast?q=${city}&appid=${apiKey}&units=metric`
        );

        if (!response.ok) throw new Error("Failed to fetch forecast data");

        const data = await response.json();
        const filtered = extractMiddayForecasts(data.list);
        setForecastList(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error fetching forecast data:", error);
        setForecastList([]);
      }
    };

    fetchForecastData();
  }, [city]);

  const extractMiddayForecasts = (dataList) => {
    const dailyMap = new Map();

    dataList.forEach((item) => {
      const dateKey = item.dt_txt.split(" ")[0];
      if (!dailyMap.has(dateKey) && item.dt_txt.includes("12:00:00")) {
        dailyMap.set(dateKey, item);
      }
    });

    return Array.from(dailyMap.values());
  };

  const formatDate = (dt_txt) => {
    const date = new Date(dt_txt);
    return `${date.getDate()} ${date.toLocaleString("default", { month: "short" })}`;
  };

  return (
    <div className=" mx-auto px-4 mt-10 overflow-x-auto">
      <h2 className="text-2xl font-bold text-white mb-4 text-center">5-Day Forecast</h2>
     <div className="flex flex-nowrap gap-4 py-4">
    {forecastList.map((item, index) => (
      <DayCard
        key={index}
        date={formatDate(item.dt_txt)}
        temperature={item.main.temp}
        mintemperature={item.main.temp_min}
        maxtemperature={item.main.temp_max}
        windspeed={item.wind.speed}
        humidity={item.main.humidity}
        description={item.weather[0].description}
        className="min-w-[200px] flex-shrink-0"
      />
    ))}
  </div>
    </div>
  );
}

export default ForecastWidget;
