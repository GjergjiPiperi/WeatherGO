import { WiHumidity, WiStrongWind } from "react-icons/wi";

function WeatherBody({ weather }) {
  const { icon, description } = weather;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@4x.png`;

  return (
    <section className="flex flex-col items-center justify-center max-w-md p-6 pt-6 mx-auto mt-4 text-xl text-white rounded-lg shadow-lg font-poppins bg-gradient-to-r from-blue-400 to-cyan-500">
      <h2 className="mb-2 text-2xl font-semibold">{weather.location}</h2>
      <img src={iconUrl} alt={description} className="w-20 h-20" />
      <h3 className="mb-4 text-4xl font-bold">{weather.temperature}°C</h3>

      <div className="flex flex-col items-center gap-2">
        <p className="flex items-center gap-2 text-lg">
          <WiHumidity className="text-2xl opacity-90" />
          Humidity: {weather.humidity}%
        </p>
        <p className="flex items-center gap-2 text-lg">
          <WiStrongWind className="text-2xl opacity-90" />
          Wind Speed: {weather.windSpeed} km/h
        </p>
      </div>
    </section>
  );
}

export default WeatherBody;
