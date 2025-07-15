import SearchBar from "./components/SearchBar";
import WeatherDetails from "./components/WeatherDetails";

function App() {
  return (
    <main className="flex h-screen w-full items-center justify-center">
      <div className="bg-dull-lavender-500/30 w-full max-w-lg rounded-lg border p-6 shadow-lg backdrop-blur-md">
        <SearchBar />
        <WeatherDetails />
      </div>
    </main>
  );
}

export default App;

//API KEY
// 2643e51d9ed12fc4d4390c78751a2d1a
