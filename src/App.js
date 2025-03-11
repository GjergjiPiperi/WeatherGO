import { useEffect, useState, useRef } from "react";
import WeatherBody from "./WeatherBody";
import WeatherSearch from "./WeatherSearch";
import WeatherBg from "./images/weather-unsplash.jpg";

function App() {
  const [weather, setWeather] = useState(null); // Updated default state to null for better handling
  const [error, setError] = useState(""); // Added state to handle errors
  const inputRef = useRef();

  const API_KEY = "8ee9b5dc9b1de10132a6ab8cde56cbee";

  async function fetchWeatherData(city) {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found.");
      }
      const data = await response.json();
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
      });
      setError(""); // Clear any previous error messages
    } catch (err) {
      setError(err.message);
      setWeather(null); // Clear weather data in case of an error
    }
  }

  function handleSearch() {
    const searchValue = inputRef.current.value.trim(); // Trim whitespace
    if (searchValue) {
      fetchWeatherData(searchValue);
    } else {
      setError("Please enter a city name.");
      setWeather(null);
    }
  }

  // Optional: Fetch default city weather on mount
  useEffect(() => {
    fetchWeatherData("New York");
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-cover"
      style={{ backgroundImage: `url(${WeatherBg})` }}
    >
      <div className="flex flex-col items-center space-y-6">
        <WeatherSearch ref={inputRef} handleSearch={handleSearch} />
        {error && (
          <p className="text-4xl font-bold text-red-500 font-poppins">
            {error}
          </p>
        )}
        {/* Display error messages */}
        {weather ? (
          <div className="w-full max-w-md">
            <WeatherBody weather={weather} />
          </div>
        ) : (
          !error && (
            <p className="mt-5 text-lg text-center">Loading weather data...</p>
          )
        )}
        {/* Handle loading and empty states */}
      </div>
    </div>
  );
}

export default App;
