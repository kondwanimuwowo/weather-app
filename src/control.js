import { getWeather } from "./model";
import { getCity, renderWeatherData, renderError, clearError } from "./view";
import { toLocalStorage, fromLocalStorage } from "./storage";

export async function initApp() {
  // console.log("Initializing App...");
  const city = (await fromLocalStorage("lastCity")) || "Lusaka";
  const unitGroup = (await fromLocalStorage("unitGroup")) || "metric";
  handleSearch();
  renderWeatherData(city, unitGroup);
  handleUnitToggling();
}

export async function handleSearch() {
  const searchBtn = document.querySelector("#search-btn");
  const cityInput = document.querySelector("#city-input");

  searchBtn.addEventListener("click", async () => {
    clearError();
    try {
      const city = getCity();
      const unitGroup = (await fromLocalStorage("unitGroup")) || "metric";
      if (city) {
        // console.log(`Searching for city: ${city}`);
        await renderWeatherData(city, unitGroup);
      } else {
        console.error("No valid city provided");
      }
      cityInput.value = "";
    } catch (error) {
      // Log the error and render an error message
      console.error("Error during search:", error);
      renderError("Failed to search for city: " + error);
    }
  });

  cityInput.addEventListener("keypress", async (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      clearError();
      try {
        const city = getCity();
        if (city) {
          // console.log(`Searching for city: ${city}`);
          await renderWeatherData(city);
        } else {
          // console.log("No valid city provided");
        }
        cityInput.value = "";
      } catch (error) {
        // Log the error and render an error message
        console.error("Error during search:", error);
        renderError("Failed to search for city: " + error);
      }
    }
  });
  // console.log("Search handler active");
}

export async function handleUnitToggling() {
  try {
    const unitSwitch = document.querySelector("#unit-switch");
    const savedUnit = await fromLocalStorage("unitGroup");
    unitSwitch.checked = savedUnit === "us";

    unitSwitch.addEventListener("change", async () => {
      clearError();
      // console.log("Unit switch changed:", unitSwitch.checked ? "US" : "Metric");
      const city = (await fromLocalStorage("lastCity")) || "Lusaka";
      const unitGroup = unitSwitch.checked ? "us" : "metric";
      await toLocalStorage("unitGroup", unitGroup);
      renderWeatherData(city, unitGroup);
      console.log(`Unit group set to: ${unitGroup}`);
    });
  } catch (error) {
    console.error("Error in handleUnitToggling:", error);
    renderError("Failed to toggle unit group: " + error);
  }
  // console.log("toggle handler active");
}
