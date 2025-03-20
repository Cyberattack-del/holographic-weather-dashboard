import React, { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import WeatherDisplay from "./components/WeatherDisplay";
//import HologramWeather from "./components/HologramEffect";
import "./styles.css";
import HologramEffect from "./components/HologramEffect";
//import VoiceControl from "./components/VoiceControl";
//import AIWeatherInsights from "./components/AIWeatherInsights";

const API_KEY = "04d0508e5f755e1deb3c5f6cfaff4b55"; // Replace with your API Key
const DEFAULT_LOCATION = { latitude: 28.6139, longitude: 77.2090 }; // New Delhi

const App = () => {
  //const [city] = useState("Delhi");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async (cityName) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message); // Handle API errors

      console.log("Weather API Response:", data);
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather:", err);
      setError(err.message);
    }
  };

  const fetchWeatherByCoords = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      if (data.cod !== 200) throw new Error(data.message);

      console.log("Weather API Response (GPS):", data);
      setWeather(data);
      setError(null);
    } catch (err) {
      console.error("Error fetching weather by location:", err);
      setError(err.message);
    }
  };

  const getUserLocation = useCallback(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByCoords(latitude, longitude);
        },
        () => {
          fetchWeatherByCoords(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
          setError("Using default location: New Delhi.");
        }
      );
    } else {
      setError("Geolocation is not supported.");
    }
  }, []);

  useEffect(() => {
    getUserLocation();
  }, [getUserLocation]);

  return (
    <div className="app">
      <h1 className="logo">Weather</h1>
      
      <SearchBar onSearch={fetchWeather} />
      <button className="location-button" onClick={getUserLocation}>
        📍 Use Precise Location
      </button>
      
   
      <HologramEffect/>
      {error && <p className="error">{error}</p>}
      {weather && <WeatherDisplay weather={weather} />}
 
    </div>
  );
};

export default App;