import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import fetchWeatherData from "./utils/fetchWeatherData";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchWeather(city) {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city, apiKey);
      if (data.cod === 200) {
        setWeatherData(data);
        setError("");
      } else {
        setError(`${data.message || "Unknown error"}`);
      }
    } catch (error) {
      setError("Failed to fetch weather data. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather("Helsinki");
  }, []);

  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="bg-dull-lavender-300/40 border-dull-lavender-400 w-full max-w-2xl rounded-lg border p-6 shadow-lg backdrop-blur-xl">
        <SearchBar onSearch={fetchWeather} />
        {error && (
          <p className="m-2 rounded-md bg-red-200 p-2 text-center text-lg font-medium text-red-600 shadow-md">
            {error}
          </p>
        )}
        {loading && <p className="text-center text-amber-500">Loading....</p>}
        {weatherData && !loading && <WeatherDetails data={weatherData} />}
      </div>
    </main>
  );
}

export default App;
