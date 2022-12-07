/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js",
    "./src/components/Current/CurrentWeather.js",
    "./src/components/Current/DataDisplay.js",
    "./src/components/Forecast/WeatherForecast.js",
    "./src/components/ControlPanel.js",
    "./src/components/Forecast/ForecastCarousel.js",
  ],
  theme: {
    extend: {
      colors: {
        forecastBtn: "#243c5a",
      },
    },
  },
  plugins: [require("daisyui")],

  daisyui: {
    styled: true,
    themes: true,
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};
