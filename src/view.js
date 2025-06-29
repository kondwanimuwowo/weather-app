import { getWeather } from "./model";
import { fromLocalStorage } from "./storage";

export function getCity() {
  console.log("getCity called");
  const lastCity = fromLocalStorage("lastCity");
  const cityInput = document.querySelector("#city-input");
  return cityInput?.value.trim() || lastCity || "Lusaka";
}

export async function renderWeatherData(city, unitGroup) {
  console.log(
    "renderWeatherData called with city:",
    city,
    "and unitGroup:",
    unitGroup
  );
  const elements = {
    cityName: document.querySelector("#city-name"),
    temperature: document.querySelector("#temperature"),
    humidity: document.querySelector("#humidity"),
    windspeed: document.querySelector("#wind"),
    conditions: document.querySelector("#condition"),
    weatherIcon: document.querySelector(".icon i"),
  };

  clearError();

  try {
    const weather = await getWeather(city);
    console.log("Weather data received:", weather);
    if (!weather || !weather.currentConditions) {
      throw new Error("Invalid weather data received");
    }
    console.log(
      "Rendering weather data for city:",
      city,
      "with unit group:",
      unitGroup
    );

    // Update UI with weather data
    elements.cityName.textContent = weather.address;
    elements.temperature.textContent = `${weather.currentTemp}°${
      unitGroup === "metric" ? "C" : "F"
    }`;
    elements.humidity.textContent = `${weather.currentHumidity}%`;
    elements.windspeed.textContent = `${weather.currentWindspeed} ${
      unitGroup === "metric" ? "km/h" : "mph"
    }`;
    elements.conditions.textContent = weather.currentConditions;
    elements.weatherIcon.className = getWeatherIconClass(weather.weatherIcon);
  } catch (error) {
    console.error("Error rendering weather data:", error.message);
    renderError("City not found. Try again with a valid city Name.");
  }
}

function getWeatherIconClass(condition) {
  if (!condition || typeof condition !== "string") {
    console.warn(`Invalid condition: ${condition}`);
    return "fas fa-question";
  }

  const normalizedCondition = condition.toLowerCase();
  const icons = {
    "clear-day": "fas fa-sun",
    "clear-night": "fas fa-moon",
    "partly-cloudy-day": "fas fa-cloud-sun",
    "cloudy": "fas fa-cloud",
    "rain": "fas fa-cloud-rain",
    "snow": "fas fa-snowflake",
    "fog": "fas fa-smog",
    "overcast": "fas fa-cloud",
  };
  return icons[normalizedCondition] ?? "fas fa-question";
}

export function renderError(message) {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage) {
    errorMessage.textContent = message;
    errorMessage.style.display = "block";
  } else {
    console.error("Error message element not found in the DOM.");
  }
}

export function clearError() {
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage) {
    errorMessage.textContent = "";
    errorMessage.style.display = "none";
  } else {
    console.warn("Error message element not found in the DOM.");
  }
}
