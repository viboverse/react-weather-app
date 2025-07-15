import forecastData from "../forcast.json";

export default function WeatherDetails() {
  const dailyForecast = forecastData.list.filter((item) => {
    return item.dt_txt.includes("12:00:00");
  });

  const formattedDate = new Date(
    forecastData.list[0].dt_txt,
  ).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="flex flex-col text-center">
      <h2 className="m-4 font-semibold">{forecastData.city.name}</h2>
      <p>{formattedDate}</p>

      <div className="flex items-center justify-center space-x-4">
        <p className="order-1">{forecastData.list[0].main.temp}°C</p>

        <img
          className="h-16 w-16 bg-red-300"
          src={`https://openweathermap.org/img/wn/${forecastData.list[0].weather[0].icon}@2x.png`}
          alt={forecastData.list[0].weather[0].description}
        />
      </div>

      <div>
        <h3 className="mb-4">5-Day Forecast</h3>
        <ul className="flex space-x-4">
          {dailyForecast.map((day, index) => {
            const iconUrl = `https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
            const date = new Date(day.dt_txt).toLocaleDateString("en-US", {
              weekday: "short",
            });

            return (
              <li key={index} className="text-center">
                <p>{date}</p>
                <img src={iconUrl} alt={day.weather[0].description} />
                <p>
                  {Math.round(day.main.temp_min)}° /{" "}
                  {Math.round(day.main.temp_max)}°
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
