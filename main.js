import { initApp } from "./src/control";
import "./src/style.css";

async function startApp() {
  try {
    await initApp();
  } catch (error) {
    console.error("Failed to start app:", error.message);
    const errorMessage = document.querySelector("#error-message");
    if (errorMessage) {
      errorMessage.textContent = "Failed to initialize app. Please try again.";
      errorMessage.style.display = "block";
    }
  }
}

startApp();

// Global error handler
window.addEventListener("unhandledrejection", (event) => {
  console.error("Unhandled promise rejection:", event.reason);
  const errorMessage = document.querySelector("#error-message");
  if (errorMessage) {
    errorMessage.textContent = "An unexpected error occurred.";
    errorMessage.style.display = "block";
  }
});
