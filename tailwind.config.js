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
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    extend: {
      colors: {
        forecastBtn: "#243c5a",
      },
      screens: {
        'hover-hover': {'raw': 'hover: hover'},
        'touch': {'raw': 'hover: none'}
      }     
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
