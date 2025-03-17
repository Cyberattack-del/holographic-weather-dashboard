import { useState, useEffect } from "react";
import { fetchWeather } from "../utils/api";

export const useWeather = (city) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (city) {
      setLoading(true);
      fetchWeather(city).then((data) => {
        setWeather(data);
        setLoading(false);
      });
    }
  }, [city]);

  return { weather, loading };
};