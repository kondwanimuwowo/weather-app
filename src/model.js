import {
  toLocalStorage,
  fromLocalStorage,
  removeFromLocalStorage,
} from "./storage";

import { getCity, renderError } from "./view";

const API_KEY = "4FQFL9F4H4WSSKTPHAZV3L2AC";
const API_URL =
  "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";

async function fetchWeatherData(city = getCity(), range, unitGroup) {
  /*console.log(
    "Fetching weather data for city:",
    city,
    "with range:",
    range,
    "and unit group:",
    unitGroup
  );*/

  try {
    const response = await fetch(
      `${API_URL}${encodeURIComponent(
        city
      )}/${range}?unitGroup=${unitGroup}&key=${API_KEY}&contentType=json`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch weather data:", error.message);
    renderError("Failed to fetch weather data: " + error.message);
    throw error;
  }
}

export async function getWeather(city = getCity(), range = "today", unitGroup) {
  unitGroup = unitGroup || (await fromLocalStorage("unitGroup")) || "metric";
  /*console.log(
    "getWeather called with city:",
    city,
    "and unitGroup:",
    unitGroup
  );*/
  if (!city?.trim() || typeof city !== "string") {
    throw new Error("City name must be a non-empty string");
  }

  const cacheKey = `${city}_${unitGroup}`;
  const cached = await fromLocalStorage(cacheKey);

  if (cached && Date.now() - cached.timestamp < 10 * 60 * 1000) {
    // console.log("Using cached data for", cacheKey);
    // console.log("Cached data:", cached.data);
    // Update the last searched city in local storage
    await toLocalStorage("lastCity", city);
    return cached.data;
  }
  // console.log("No valid cache found for", cacheKey, ", fetching new data.");
  try {
    const weatherData = await fetchWeatherData(city, range, unitGroup);
    if (!weatherData?.currentConditions) {
      throw new Error("Invalid weather data received");
    }

    // Store the last searched city in local storage
    await toLocalStorage("lastCity", city);

    const {
      resolvedAddress: address,
      currentConditions: {
        temp: currentTemp = 0,
        windspeed: currentWindspeed = 0,
        conditions: currentConditions = "",
        humidity: currentHumidity = 0,
        icon: weatherIcon = "",
      },
    } = weatherData;

    /*console.log("Data Fetched", {
      currentTemp,
      currentHumidity,
      currentWindspeed,
      currentConditions,
      weatherIcon,
    });*/
    // Cache the fetched data
    await toLocalStorage(cacheKey, {
      timestamp: Date.now(),
      data: {
        currentTemp,
        currentHumidity,
        currentWindspeed,
        currentConditions,
        weatherIcon,
        address,
      },
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
    console.error("Error fetching weather data:", error.message);
    renderError("Failed to get the weather data: " + error.message);
    throw error;
  }
}
