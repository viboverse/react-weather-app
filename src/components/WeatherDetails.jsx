import { useEffect, useState } from "react";
import ForcastItem from "./ForcastItem";
import fetchWeatherData from "../utils/fetchWeatherData";
import { motion } from "motion/react";

const apiKey = import.meta.env.VITE_API_KEY;

export default function WeatherDetails({ data }) {
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const cityName = data?.name;

  // Format current date
  const formattedDate = new Date().toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

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

    console.log(data);

    fetchForecast();
  }, [cityName]);

  return (
    <div className="flex flex-col text-center">
      <h2 className="font-poppins m-4 text-4xl font-bold text-gray-800">
        {cityName}
      </h2>
      <p className="text-xl font-medium text-gray-700">{formattedDate}</p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "backInOut" }}
        whileHover={{ scale: 1.2 }}
        className="flex flex-col items-center justify-center space-x-4 sm:flex-row"
      >
        <p className="order-1 text-5xl font-semibold text-blue-600">
          {Math.round(data.main.temp)}°C
        </p>
        <img
          className="h-30 w-30"
          src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
          alt={data.weather[0].description}
        />
      </motion.div>

      <div className="mb-4 flex flex-col items-center">
        <p className="text-lg tracking-wide text-gray-700 capitalize">
          {data.weather[0].description}
        </p>
        <p className="mt-2 inline-block rounded-lg bg-blue-100 px-4 py-1 text-xl font-semibold text-blue-700 shadow-sm">
          Feels Like: {Math.round(data.main.feels_like)}°C
        </p>
      </div>

      <div>
        <h3 className="mt-4 text-xl font-bold text-gray-700">5-Day Forecast</h3>

        {loading && (
          <p className="text-2xl font-medium text-green-500">
            Loading forecast...
          </p>
        )}

        {!loading && error && <p className="text-red-500">{error}</p>}

        {!loading && !error && dailyForecast.length > 0 && (
          <ul className="flex flex-wrap justify-center gap-4 p-4">
            {dailyForecast.map((day, index) => {
              const forecastIconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
              const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
                weekday: "short",
              });

              return (
                <ForcastItem
                  key={day.dt}
                  index={index}
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
          <p className="text-lg font-medium text-gray-600">
            No forecast data available
          </p>
        )}
      </div>
    </div>
  );
}
