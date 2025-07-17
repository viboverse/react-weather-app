import { useState } from "react";
import Icon from "../assets/magnifying-glass-solid.svg";

export default function SearchBar({ onSearch }) {
  const [enteredCity, setEnetereCity] = useState("");

  function handleInputChange(event) {
    setEnetereCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSearch(enteredCity);
    setEnetereCity("");
  }
  return (
    <form className="flex items-center justify-around" onSubmit={handleSubmit}>
      <input
        className="border-electric-violet-700 focus:bg-electric-violet-300 mb-2 w-96 rounded-lg border-1 p-2 shadow-lg outline-none placeholder:italic"
        type="text"
        value={enteredCity}
        placeholder="Enter a city name..."
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className="ml-2 flex items-center justify-center rounded-full bg-gradient-to-tr from-violet-500 to-blue-500 p-3 shadow-lg transition hover:scale-105 hover:from-violet-600 hover:to-blue-600 focus:ring-2 focus:ring-violet-400 focus:outline-none"
      >
        <img src={Icon} alt="Search" className="h-5 w-5" />
      </button>
    </form>
  );
}
