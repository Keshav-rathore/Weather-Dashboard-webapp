import { BsWind, BsDroplet, BsThermometerSun, BsThermometerSnow } from "react-icons/bs";
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiFog } from "react-icons/wi";

function getWeatherIcon(description) {
  const lower = description.toLowerCase();
  if (lower.includes("sun")) return <WiDaySunny className="text-yellow-400 text-4xl" />;
  if (lower.includes("cloud")) return <WiCloudy className="text-gray-400 text-4xl" />;
  if (lower.includes("rain")) return <WiRain className="text-blue-400 text-4xl" />;
  if (lower.includes("snow")) return <WiSnow className="text-blue-200 text-4xl" />;
  if (lower.includes("fog")) return <WiFog className="text-gray-300 text-4xl" />;
  return <WiDaySunny className="text-yellow-300 text-4xl" />;
}

function DayCard({ date, temperature, mintemperature, maxtemperature, windspeed, humidity, description }) {
  return (
    <div className="p-4 w-64 bg-white rounded-2xl shadow-xl text-gray-800 flex flex-col items-center gap-2">
      <h3 className="text-xl font-semibold">{date}</h3>
      <div className="flex items-center gap-2">
        {getWeatherIcon(description)}
        <p className="capitalize font-medium text-gray-600">{description}</p>
      </div>
      
      <p className="text-xl font-bold">{temperature}°C</p>

      <div className="flex justify-between gap-10 px-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <span>Min: {mintemperature}°C</span>
        </div>
        <div className="flex items-center gap-1">
          <span>Max: {maxtemperature}°C</span>
        </div>
      </div>

      <div className="flex justify-between gap-10 px-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <BsWind />
          <span>{windspeed} m/s</span>
        </div>
        <div className="flex items-center gap-1">
          <BsDroplet />
          <span>{humidity}%</span>
        </div>
      </div>
    </div>
  );
}

export default DayCard;
