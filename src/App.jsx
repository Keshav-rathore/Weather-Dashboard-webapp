import { useState } from "react";
import Searchbar from "./components/Searchbar";
import CurrentWidget from "./components/CurrentWidget";
import ForecastWidget from "./components/ForecastWidget";
import backgroundImg from './assets/Background.jpg';

function App() {
  const [city, setCity] = useState("Bhopal");
  const [country, setCountry] = useState("India");


  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat overflow-x-hidden flex flex-col items-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="w-full max-w-7xl px-4 py-6">
        <Searchbar
          city={city}
          setCity={setCity}
          country={country}
        
        />
        <div className="mt-6">
          <CurrentWidget city={city} 
          country={country} 
          setCountry={setCountry} 
          />
        </div>
        <div className="mt-6">
          <ForecastWidget city={city}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
