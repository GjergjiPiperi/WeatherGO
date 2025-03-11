function WeatherBody({ weather }) {
  const { icon, description } = weather;

  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
  return (
    <section className="flex flex-col items-center justify-center max-w-md p-6 pt-6 mx-auto mt-4 text-xl text-white rounded-lg shadow-lg font-poppins bg-gradient-to-r from-blue-400 to-cyan-500">
      <h2 className="mb-2 text-2xl font-semibold">{weather.location}</h2>
      <img src={iconUrl} alt={description} className="w-20 h-20" />
      <h3 className="mb-4 text-4xl font-bold">{weather.temperature}°C</h3>
      <p className="mb-1 text-lg">Humidity {weather.humidity}%</p>
      <p className="text-lg">Wind Speed {weather.windSpeed}km/h</p>
    </section>
  );
}

export default WeatherBody;
