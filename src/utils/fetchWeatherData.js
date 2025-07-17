export default async function fetchWeatherData(city, apiKey, type = "weather") {
  const url = `https://api.openweathermap.org/data/2.5/${type}?q=${city}&units=metric&appid=${apiKey}`;
  const response = await fetch(url);
  return response.json();
}
