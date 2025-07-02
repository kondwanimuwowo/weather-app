# Kuwala: A Modern Weather App

**Kuwala** is a sleek, user-friendly weather application that provides real-time weather data for any city worldwide. Built with modern web technologies, it offers a responsive design, unit toggling (Celsius/Fahrenheit), local storage for user preferences, and robust error handling. Named after the Bemba word for "light" or "shine," Kuwala aims to bring clarity and simplicity to weather forecasting.

## Features

- **Real-Time Weather Data**: Fetches current temperature, humidity, wind speed, and conditions using the [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api).
- **Unit Toggling**: Switch between Celsius (metric) and Fahrenheit (US) units with a custom-styled toggle, with preferences saved in `localStorage`.
- **City Search**: Search for any city with input validation and a loading spinner for a smooth UX.
- **Local Storage**: Caches weather data and user preferences (city, unit) to improve performance and offline access.
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens with a clean, modern UI.
- **Error Handling**: Displays user-friendly error messages for invalid cities or API failures.
- **Font Awesome Icons**: Dynamic weather icons for visual appeal.

_Future Features (Planned)_:

- 5-day weather forecast display.
- Severe weather alerts.
- Dark/light theme switching for personalized UX.

## Demo

Check out the live demo at [https://kondwanimuwowo.github.io/weather-app/](https://kondwanimuwowo.github.io/weather-app/).

## Screenshots

![Kuwala Screenshot](public/screenshot.png)  
_Current weather display for Lusaka with unit toggle and search bar._

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES Modules)
- **Build Tool**: [Vite](https://vitejs.dev/) for fast development and production builds
- **API**: [Visual Crossing Weather API](https://www.visualcrossing.com/weather-api)
- **Icons**: [Font Awesome Free](https://fontawesome.com/) for weather icons
- **Deployment**: GitHub Pages
- **Package Management**: npm

## Installation and Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- [npm](https://www.npmjs.com/) (v8 or higher)
- A [Visual Crossing API key](https://www.visualcrossing.com/sign-up)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/kondwanimuwowo/weather-app.git
   cd weather-app
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up API Key**:

   - Add your Visual Crossing API key to `model.js`:
     ```javascript
     const API_KEY = "your-api-key-here";
     ```
   - Replace `your-api-key-here` with your actual API key.

4. **Run Locally**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:5173/weather-app/` in your browser.

5. **Build for Production**:

   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist` folder.

6. **Deploy to GitHub Pages**:
   - Ensure `vite.config.js` has the correct `base` path:
     ```javascript
     base: "/weather-app/",
     ```
   - Build and deploy:
     ```bash
     npm run build
     npm run deploy
     ```
   - Ensure your `package.json` has a deploy script (e.g., using `gh-pages`):
     ```json
     "scripts": {
       "deploy": "gh-pages -d dist"
     }
     ```

## Usage

1. Open the app at [https://kondwanimuwowo.github.io/weather-app/](https://kondwanimuwowo.github.io/weather-app/).
2. Enter a city name (e.g., "Lusaka") in the search bar and press Enter or click the Search button.
3. Toggle between Celsius and Fahrenheit using the unit toggle switch.
4. View current weather data, including temperature, humidity, wind speed, and conditions.
5. If an invalid city is entered, an error message will display.
6. Weather data and preferences are cached in `localStorage` for quick access.

## Challenges Faced and Solutions

Building "Kuwala" was a rewarding journey that came with challenges, overcome through research and iterative development. Below is a key challenge and how it was addressed:

1. **Challenge: Implementing a Custom Unit Toggle Slider**
   - **Issue**: The unit toggle (`#unit-switch`) worked when clicking the labels (°C/°F) but not the slider itself, as the checkbox was hidden (`opacity: 0`).
   - **Solution**: Added a `click` event listener to the `.slider` element in `control.js` to programmatically toggle the checkbox’s `checked` state and dispatch a `change` event. This reused existing logic, ensuring consistency:
     ```javascript
     slider.addEventListener("click", () => {
       unitSwitch.checked = !unitSwitch.checked;
       const changeEvent = new Event("change");
       unitSwitch.dispatchEvent(changeEvent);
     });
     ```
   - **Outcome**: Clicking the slider now toggles units seamlessly, enhancing UX.

## Future Improvements

To elevate "Kuwala" to a truly world-class app, the following features are planned:

- **5-Day Forecast**: Display a 5-day forecast using the `days` array from the API, styled as responsive cards.
- **Weather Alerts**: Show severe weather alerts for safety, leveraging the API’s `alerts` data.
- **Theme Switching**: Add a dark/light mode toggle with `localStorage` persistence.
- **Geolocation**: Allow users to fetch weather based on their current location.
- **Unit Tests**: Add Jest or Vitest to ensure code reliability.

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a Pull Request.

Please follow the [Code of Conduct](CODE_OF_CONDUCT.md) and ensure code adheres to the project’s ESLint rules.

## License

This project is licensed under the [MIT License](LICENSE).

## Acknowledgments

- [Visual Crossing](https://www.visualcrossing.com/) for providing a reliable weather API.
- [Font Awesome](https://fontawesome.com/) for free weather icons.
- [Vite](https://vitejs.dev/) for an excellent build tool.
- My mentor and peers for feedback and encouragement during development.

## Contact

For questions or feedback, reach out via [GitHub Issues](https://github.com/kondwanimuwowo/weather-app/issues) or email at kondwanimuwowo@example.com.

---

_Kuwala_ is a passion project built to deliver accurate, accessible, and delightful weather updates. Thank you for exploring it!
