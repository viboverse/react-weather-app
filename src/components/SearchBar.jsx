import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [enteredCity, setEnetereCity] = useState("");

  function handleInputChange(event) {
    setEnetereCity(event.target.value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    console.log(enteredCity);

    onSearch(enteredCity);
    setEnetereCity("");
  }
  return (
    <form className="flex items-center justify-between" onSubmit={handleSubmit}>
      <input
        className="border-seagull-700 focus:bg-seagull-200 w-75 rounded-lg border-2 p-2 outline-none placeholder:italic"
        type="text"
        value={enteredCity}
        placeholder="Enter a city name..."
        onChange={handleInputChange}
      />

      <button
        className="bg-seagull-500 mx-1 rounded-md px-4 py-2 text-base hover:cursor-pointer hover:opacity-70"
        type="submit"
      >
        Find
      </button>
    </form>
  );
}
