import { getWeather } from "./model";
import { getCity, renderWeatherData } from "./view";

export async function initApp() {
  renderWeatherData();
  handleSearch();
}

export function handleSearch() {
  console.log("Search handler active");

  const searchBtn = document.querySelector("#search-btn");
  const cityInput = document.querySelector("#city-input");
  if (!searchBtn) {
    console.error("Search button with ID 'searchBtn' not found");
    return;
  }

  searchBtn.addEventListener("click", () => {
    const city = getCity();
    if (city) {
      console.log(`Searching for city: ${city}`);
      renderWeatherData(city);
    } else {
      console.log("No valid city provided");
    }
  });
  cityInput.textContent = "";
}
