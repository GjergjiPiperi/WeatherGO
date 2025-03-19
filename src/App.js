import { useEffect, useState, useRef } from "react";
import WeatherBody from "./WeatherBody";
import WeatherSearch from "./WeatherSearch";

function App() {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [background, setBackground] = useState("default-bg.jpg"); // Default before fetching
  const [loading, setLoading] = useState(false); // Loading state to prevent showing old data
  const inputRef = useRef();

  const API_KEY = "8ee9b5dc9b1de10132a6ab8cde56cbee";

  async function fetchWeatherData(city) {
    try {
      setLoading(true); // Start loading state
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error("City not found.");
      }
      const data = await response.json();

      console.log("Full API Response:", data);

      // Set weather state
      setWeather({
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: data.weather[0].icon,
        description: data.weather[0].description,
        condition: data.weather[0].main, // Get weather condition
      });

      setError("");
      updateBackground(data.weather[0].main); // Set background based on condition
    } catch (err) {
      setError(err.message);
      setWeather(null);
      setBackground("default-bg.jpg"); // Reset to default background if error
    } finally {
      setLoading(false); // End loading state
    }
  }

  function updateBackground(condition) {
    const backgrounds = {
      Clear: "backgrounds/clear-sky.jpg",
      Clouds: "backgrounds/cloudy.jpg",
      Rain: "backgrounds/rainy.jpg",
      Snow: "backgrounds/snow.jpg",
      Thunderstorm: "backgrounds/storm.jpg",
      Drizzle: "backgrounds/drizzle.jpg",
      Mist: "backgrounds/foggy.jpg",
      Haze: "backgrounds/haze.jpg",
    };

    // Set background or default if condition not found
    setBackground(backgrounds[condition] || "backgrounds/default-bg.jpg");
  }

  function handleSearch() {
    const searchValue = inputRef.current.value.trim();
    if (searchValue) {
      fetchWeatherData(searchValue);
    } else {
      setError("Please enter a city name.");
      setWeather(null);
    }
  }

  // 🌟 Fetch New York weather & background on first mount
  useEffect(() => {
    fetchWeatherData("New York");
  }, []); // Empty array ensures this only runs once on mount

  return (
    <div
      className="flex flex-col items-center justify-center h-screen bg-center bg-cover"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex flex-col items-center space-y-6">
        <WeatherSearch ref={inputRef} handleSearch={handleSearch} />
        {error && <p className="text-4xl font-bold text-red-500">{error}</p>}
        {loading ? (
          <p className="mt-5 text-lg text-center">Loading weather data...</p>
        ) : weather ? (
          <div className="w-full max-w-md">
            <WeatherBody weather={weather} />
          </div>
        ) : (
          !error && (
            <p className="mt-5 text-lg text-center">No data available</p>
          )
        )}
      </div>
    </div>
  );
}

export default App;
