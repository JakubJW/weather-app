import CurrentWeather from "./components/Current/CurrentWeather";
import WeatherForecast from "./components/Forecast/WeatherForecast";
import ControlPanel from "./components/ControlPanel";
import React from "react";
import { getCoordinates, fetchForecastWeather, fetchCurrentWeather } from './api/fetchWeather'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      isDataSet: false,
      currentData: {
        feelsLike: "-",
        humidity: "-",
        icon: "",
        mainWeather: "-",
        pressure: "-",
        temp: "-",
        windSpeed: "-",
      },

      forecastData: {
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
      },
    };
  }

  //Funkcja pozyskująca koordynaty dzięki geolokalizacji
  useGeolocation() {
    return new Promise((resolve, reject) => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve({lat: position.coords.latitude, lon: position.coords.longitude})
        });
      } else {
        reject(console.log("geolocation unavailable"))
      }
    })
  }


  async setCurrentData(coordinates) {
    let weatherData;
    let forecastData;

    try {
      weatherData = await fetchCurrentWeather(coordinates);
      forecastData = await fetchForecastWeather(coordinates);
    } catch (e) {
      console.log(e);
      console.log("Error!");
    }

    this.setState(() => ({
      currentData: {
        mainWeather: weatherData.weather[0].main,
        icon: weatherData.weather[0].icon,
        temp: (weatherData.main.temp - 270).toFixed() + "°C",
        feelsLike: (weatherData.main.feels_like - 270).toFixed() + "°C",
        pressure: weatherData.main.pressure + "hPa",
        humidity: weatherData.main.humidity + "%",
        windSpeed: weatherData.wind.speed + "m/s",
      },

      forecastData: {
        day1: forecastData.list.slice(0, 8),
        day2: forecastData.list.slice(8, 16),
        day3: forecastData.list.slice(16, 24),
        day4: forecastData.list.slice(24, 32),
        day5: forecastData.list.slice(32, 40),
      },

      isDataSet: true,
    }));
  }

  handleLocation = async (location) => {
    this.setState({ location: location });
    this.setCurrentData(await getCoordinates(location))
  };

  handleGeolocation = async (props) => {
    if (props === true) {
      this.setCurrentData(await this.useGeolocation())
    }
  };

  render() {
    return (
      <div
        className="min-h-screen 
      items-center 
      justify-center 
      md:flex"
      >
        <div
          className="mt-8 
          box-border 
          flex 
          flex-col 
          gap-8 
          p-4"
        >
          <ControlPanel
            submitLocation={this.handleLocation}
            enableGeolocation={this.handleGeolocation}
          />
          <CurrentWeather currentData={this.state.currentData} />
        </div>

        <div className="flex flex-col">
          <WeatherForecast
            forecastData={this.state.forecastData}
            isDataSet={this.state.isDataSet}
          />
        </div>
      </div>
    );
  }
}

export default App;
