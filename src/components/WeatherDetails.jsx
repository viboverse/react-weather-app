import { useEffect, useState } from "react";
import ForcastItem from "./ForcastItem";
import fetchWeatherData from "../utils/fetchWeatherData";

const apiKey = import.meta.env.VITE_API_KEY;

export default function WeatherDetails({ data }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Get the current city name from the data prop
  const cityName = data?.name;

  // Format current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Extract daily forecasts at noon
  const dailyForecast = forecastData?.list
    ? forecastData.list.filter((item) => item.dt_txt.includes("12:00:00"))
    : [];

  useEffect(() => {
    if (!cityName) return;

    async function fetchForecast() {
      setLoading(true);
      setError("");
      try {
        const response = await fetchWeatherData(cityName, apiKey, "forecast");
        setForecastData(response);
      } catch (error) {
        setError("Failed to fetch forecast data. Please try again later.");
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchForecast();
  }, [cityName]);

  return (
    <div className="flex flex-col text-center">
      <h2 className="m-4 font-semibold">{cityName}</h2>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-center space-x-4">
        <p className="order-1">{Math.round(data.main.temp)}°C</p>
        <img
          className="h-16 w-16"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </div>

      {/* Forecast section */}
      <div>
        <h3 className="mt-4 mb-4">5-Day Forecast</h3>

        {loading && <p className="text-amber-500">Loading forecast...</p>}

        {!loading && error && <p className="text-red-500">{error}</p>}

        {!loading && !error && dailyForecast.length > 0 && (
          <ul className="flex justify-center space-x-4">
            {dailyForecast.map((day) => {
              const forecastIconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
              const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              });
              console.log(day);

              return (
                <ForcastItem
                  key={day.dt}
                  date={date}
                  iconUrl={forecastIconUrl}
                  temp={Math.round(day.main.temp)}
                  altImage={day.weather[0].description}
                />
              );
            })}
          </ul>
        )}

        {!loading && !error && dailyForecast.length === 0 && (
          <p>No forecast data available</p>
        )}
      </div>
    </div>
  );
}
