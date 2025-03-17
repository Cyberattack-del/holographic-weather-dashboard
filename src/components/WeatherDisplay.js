import React from "react";
import "../styles/WeatherDisplay.css"; 

const WeatherDisplay = ({ weather }) => {
  console.log("Weather Data in Display:", weather); // Debugging log

  if (!weather) return <p>Loading weather data...</p>;

  const { main, weather: weatherDetails, name } = weather;
  const description = weatherDetails?.[0]?.description || "Unknown";
  const temperature = main?.temp || "N/A";
  const humidity = main?.humidity || "N/A";
  const weatherType = weatherDetails?.[0]?.main || "Default";

  const getWeatherIcon = (type) => {
    switch (type) {
      case "Clear":
        return "/images/sun-holo.jpg";
      case "Clouds":
        return "/images/clouds-holo.jpg";
      case "Rain":
        return "/images/rain-holo.jpg";
      case "Snow":
        return "/images/snow-holo.png";
      default:
        return "/images/default-holo.png";
    }
  };

  return (
    <div className="weather-container">
      <h2>📍 {name || "Unknown Location"}</h2>
      <p className="holo-text">{description}</p>
      <img src={getWeatherIcon(weatherType)} alt={description} className="holo-icon" />
      <p className="temp">🌡 Temperature: {temperature}°C</p>
      <p className="humidity">💧 Humidity: {humidity}%</p>
    </div>
  );
};

export default WeatherDisplay;