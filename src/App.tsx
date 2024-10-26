import { useState } from "react";
import getTodayDate from "./utils/today-date";

interface WeatherDescription {
  main: string;
  description: string;
  icon: string;
}

interface CityWeather {
  main: {
    temp: number;
    feels_like: number;
    humidity: number;
  };
  name: string;
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
  };
  cod: number;
  message: string;
}

function App() {
  const [city, setCity] = useState<string>("");
  const [cityWeather, setCityWeather] = useState<CityWeather | null>(null);
  const [loading, setLoading] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const weatherApiUrl = import.meta.env.VITE_WEATHER_API_URL;
  const weatherIconApiUrl = import.meta.env.VITE_WEATHER_ICON_API_URL;
  const { day, date, month, year } = getTodayDate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `${weatherApiUrl}?q=${city}&units=metric&appid=${apiKey}`
      );
      const weatherData = await response.json();
      if (weatherData.cod == "404") {
        console.log(weatherData);
        throw new Error(weatherData.message);
      }
      setCityWeather(weatherData);
    } catch (error) {
      if (error instanceof Error) {
        setNotFound(true);
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCity(value);
  };

  return (
    <>
      <main className="min-h-screen min-w-max flex bg-slate-100">
        <div className="search-weather w-[55%] rounded-r-3xl relative bg-hero-image bg-center bg-cover p-10">
          <a
            href="https://www.freepik.com/free-ai-image/cloud-forest-landscape_311065863.htm#fromView=keyword&page=1&position=12&uuid=36e67e4c-46e5-44bc-8f9c-84aebf1f53db"
            className="absolute bottom-2 text-white z-10 left-2"
          >
            Image by Freepik
          </a>
          <div className="absolute inset-0 bg-black opacity-50 rounded-r-3xl"></div>
          <div className="web-title h-[50px] absolute">
            <h1 className="text-xl text-slate-100 font-semibold">
              Weather Today
            </h1>
          </div>
          <div className="search-weather-content h-full flex flex-col justify-center items-center relative">
            <div className="text-3xl text-slate-100 font-medium">
              <p>
                {loading
                  ? "Please Wait..."
                  : "Today's Weather at Your Fingertips"}
              </p>
            </div>
            <hr className="w-48 h-1 mx-auto my-5 bg-gray-100 border-0 rounded" />
            <div className="search-input hover:outline-2">
              <form onSubmit={handleSubmit} className="weather-form">
                <div className="w-[400px] text-xl p-2 rounded flex bg-slate-200 bg-opacity-30">
                  <input
                    autoComplete="off"
                    type="text"
                    name="city"
                    id="city"
                    className="input-text bg-transparent w-full outline-none placeholder-white caret-white text-white"
                    placeholder="Enter Location"
                    onChange={handleChange}
                    value={city}
                  />
                  <button type="submit">
                    <img
                      src="/icon/search.png"
                      height="30px"
                      width="30px"
                      alt=""
                    />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="detail-weather w-[45%] bg-slate-100 flex justify-center items-center relative">
          <div className="flex flex-col">
            <div className="mb-5">
              <h2 className="text-4xl font-bold">
                Today{cityWeather ? ` in ${cityWeather?.name}` : ""}
              </h2>
            </div>
            <div className="detail-weather-card bg-white w-[500px] flex h-min-[300px] rounded-xl shadow-2xl pt-9 pb-9 pr-5 pl-5">
              <div className="weather-condition w-[50%] p-5 border-r-4 leading-2">
                <h3 className="text-5xl font-semibold">
                  {cityWeather ? Math.round(cityWeather.main.temp) : "0"}&deg;C
                </h3>
                <div className="flex flex-col items-center h-min-[100px] mb-3">
                  <img
                    src={`${weatherIconApiUrl}/${
                      cityWeather ? cityWeather.weather[0].icon : ""
                    }@2x.png`}
                    alt=""
                  />
                  <p className="text-3xl font-normal text-gray-500">
                    {cityWeather ? cityWeather.weather[0].main : "Unknown"}
                  </p>
                </div>
                <p className="text-md text-gray-500 font-medium">
                  {cityWeather ? cityWeather.weather[0].description : "Unknown"}
                </p>
                <p className="text-sm text-gray-500 font-medium">{`${day} ${date}, ${month} ${year}`}</p>
              </div>
              <div className="another-weather-condition w-[50%] p-5 flex flex-col justify-center text-gray-500 leading-8">
                <p>
                  Feels Like:{" "}
                  {cityWeather ? Math.round(cityWeather.main.feels_like) : "0"}
                  &deg;C
                </p>
                <p>
                  Humidity: {cityWeather ? cityWeather.main.humidity : "0"}%
                </p>
                <p>Cloudiness: {cityWeather ? cityWeather.clouds.all : "0"}%</p>
                <p>
                  Wind Speed: {cityWeather ? cityWeather.wind.speed : "0"} m/s
                </p>
              </div>
            </div>
          </div>
          <footer className="text-black py-4 absolute bottom-0 right-4">
            <div className="container mx-auto text-center">
              <p className="text-sm">
                &copy; {year} Ihsan Alhakim. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </main>
      {notFound && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => {
            setCity("");
            setNotFound(false);
          }}
        >
          <div className="not-found-alert bg-slate-100 w-[300px] h-[170px] rounded-xl p-4 flex flex-col text-black">
            <p className="font-bold mb-1">City Not Found</p>
            <p className="text-blacktext-lg font-this">
              We couldn't find the weather for that city. Please enter a valid
              city name
            </p>
            <button
              className="bg-blue-600 hover:bg-blue-800 transition ease-linear delay-75 text-white p-2 rounded text-center mt-auto"
              onClick={() => {
                setCity("");
                setNotFound(false);
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
