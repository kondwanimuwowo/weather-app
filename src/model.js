const API_KEY = "4FQFL9F4H4WSSKTPHAZV3L2AC";

async function fetchWeatherData(city, range = "today") {
  try {
    const API_URL = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
      city
    )}/${range}?unitGroup=metric&key=${API_KEY}&contentType=json`;
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
    throw error;
  }
}

export async function getWeather(city) {
  console.log("Fetching weather data for:", city);
  try {
    const weatherData = await fetchWeatherData(city);
    if (!weatherData || !weatherData.currentConditions) {
      throw new Error("Invalid weather data received");
    }
    const address = weatherData.resolvedAddress;
    const currentTemp = weatherData.currentConditions.temp;
    const currentWindspeed = weatherData.currentConditions.windspeed;
    const currentConditions = weatherData.currentConditions.conditions;
    const currentHumidity = weatherData.currentConditions.humidity;
    const weatherIcon = weatherData.currentConditions.icon;
    console.log("Data Fetched");

    console.log({
      currentTemp,
      currentHumidity,
      currentWindspeed,
      currentConditions,
      weatherIcon,
    });

    return {
      currentTemp,
      currentHumidity,
      currentWindspeed,
      currentConditions,
      weatherIcon,
      address,
    };
  } catch (error) {
    console.log("Error fetching weather data:", error.message);
    throw error;
  }
}
