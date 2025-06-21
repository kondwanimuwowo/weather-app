import { getWeather } from "./model";

export function getCity() {
  const cityInput = document.getElementById("city-input");
  return cityInput ? cityInput.value.trim() : "Lusaka";
}

export async function renderWeatherData() {
  const city = getCity() || "Lusaka";
  console.log("Rendering weather data for:", city);
  const elements = {
    cityName: document.querySelector("#city-name"),
    temperature: document.querySelector("#temperature"),
    humidity: document.querySelector("#humidity"),
    windspeed: document.querySelector("#wind"),
    conditions: document.querySelector("#condition"),
    weatherIcon: document.querySelector(".icon i"),
  };

  try {
    const weather = await getWeather(city);
    if (!weather || !weather.currentConditions) {
      throw new Error("Invalid weather data received");
    }
    const icons = weather.weatherIcon;
    elements.cityName.textContent = `${weather.address}`;
    elements.temperature.textContent = `${weather.currentTemp}°C`;
    elements.humidity.textContent = `${weather.currentHumidity}%`;
    elements.windspeed.textContent = `${weather.currentWindspeed}km/h`;
    elements.conditions.textContent = `${weather.currentConditions}`;

    switch (icons) {
      case "clear-day":
        elements.weatherIcon.className = "fas fa-sun";
        break;
      case "clear-night":
        elements.weatherIcon.className = "fas fa-moon";
        break;
      case "partly-cloudy-day":
        elements.weatherIcon.className = "fas fa-cloud-sun";
        break;
      case "cloudy":
        elements.weatherIcon.className = "fas fa-cloud";
        break;
      case "rain":
        elements.weatherIcon.className = "fas fa-cloud-rain";
        break;
      default:
        elements.weatherIcon.className = "fas fa-question";
        console.warn(`Unknown weather icon: ${icons}`);
    }
  } catch (error) {
    console.error("Error rendering weather data:", error.message);
    throw error;
  }
}
