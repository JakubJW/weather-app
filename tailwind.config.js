/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/App.js", 
    "./src/CurrentWeather.js", 
    "./src/DataDisplay.js",
    "./src/WeatherForecast.js",
    "./src/ControlPanel.js",
    "./src/ForecastCarousel.js"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
