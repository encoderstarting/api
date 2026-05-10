import { useState } from "react";
import { getWeather } from "../api/weatherApi";
import StatusMessage from "../components/StatusMessage";

function WeatherPage() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    setIsLoading(true);
    setError("");
    setWeather(null);

    getWeather(city)
      .then((data) => {
        setWeather(data);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  return (
    <section id="center">
      <div className="hero">
        <h1>Погода</h1>

        <form onSubmit={handleSubmit}>
          <label>
            Город
            <input
              value={city}
              onChange={(event) => setCity(event.target.value)}
              placeholder="Например: Moscow"
            />
          </label>

          <button type="submit" disabled={isLoading}>
            Узнать погоду
          </button>
        </form>

        {isLoading && <StatusMessage>Загрузка...</StatusMessage>}
        {error && <StatusMessage>Ошибка: {error}</StatusMessage>}

        {weather && weather.weather && (
          <div className="product-card">
            <h2>{weather.city}</h2>
            <p>Страна: {weather.country}</p>
            <p>Температура: {weather.weather.temperature_2m} °C</p>
            <p>Скорость ветра: {weather.weather.wind_speed_10m} км/ч</p>
          </div>
        )}

        {weather && !weather.weather && (
          <StatusMessage>{weather.message}</StatusMessage>
        )}
      </div>
    </section>
  );
}

export default WeatherPage;