import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";
import fetchWeatherData from "./utils/fetchWeatherData";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchWeather(city) {
    setLoading(true);
    try {
      const data = await fetchWeatherData(city, apiKey);
      if (data.cod === 200) {
        setWeatherData(data);
      } else {
        setError(`City not found: ${data.message || "Unknown error"}`);
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
      <div className="bg-dull-lavender-300/40 w-full max-w-lg rounded-lg border p-6 shadow-lg backdrop-blur-md">
        <SearchBar onSearch={fetchWeather} />
        {error && <p className="text-center text-red-500">{error}</p>}
        {loading && <p className="text-center text-amber-500">Loading....</p>}
        {weatherData && !loading && <WeatherDetails data={weatherData} />}
      </div>
    </main>
  );
}

export default App;
