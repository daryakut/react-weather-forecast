import React, { useState } from "react";
import WeatherInfo from "./WeatherInfo";
import WeatherForecast from "./WeatherForecast";
import CityBackground from "./CityBackground";
import axios from "axios";
import "./Weather.css";


export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
   const [cityInput, setCityInput] = useState("Berlin"); 
  const [city, setCity] = useState(props.defaultCity);

  function handleResponse(response) {
    console.log(response);
    setWeatherData({
      ready: true,
      coordinates: response.data.coord,
      temperature: response.data.main.temp,
      humidity: response.data.main.humidity,
      date: new Date(response.data.dt * 1000),
      description: response.data.weather[0].description,
      icon: response.data.weather[0].icon,
      wind: response.data.wind.speed,
      city: response.data.name,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(cityInput);
    search();
     event.target[0].value = "";
  }


  function handleCityChange(event) {
    setCityInput(event.target.value);
  }

  function search() {
    const apiKey = "88c09f696266983e1aafe60fe4c4f352";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <CityBackground city={city} />
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-9">
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                autoFocus="on"
                onChange={handleCityChange}
              />
            </div>
            <div className="col-3">
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </div>
          </div>
        </form>
        <WeatherInfo data={weatherData} />
        <WeatherForecast coordinates={weatherData.coordinates} />
        <div className="sourceCodeLink">
          <a
            href="https://github.com/daryakut/react-weather-forecast.git"
            target="_blank"
            rel="noopener noreferrer"
          >
            View Source Code on GitHub
          </a>
        </div>
      </div>
    );
  } else {
    search();
    return "Loading...";
  }
}
