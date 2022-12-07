import CurrentWeather from "./components/Current/CurrentWeather";
import WeatherForecast from "./components/Forecast/WeatherForecast";
import ControlPanel from "./components/ControlPanel";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      location: "",
      isDataSet: false,
      geolocation: false,
      currentData: {
        feelsLike: "",
        humidity: "",
        icon: "",
        mainWeather: "",
        pressure: "",
        temp: "",
        windSpeed: "",
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

  //Funkcja pozyskująca koordynaty po wpisaniu lokalizacji
  async getCoordinates(location) {
    let coordinates = [];

    const response = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        location +
        "&appid=93306e7b1c2d7e5a1cfcd5271a751dd0",
      { method: "GET" }
    );
    const json = await response.json();

    coordinates[0] = json[0].lat;
    coordinates[1] = json[0].lon;

    return coordinates;
  }

  async weatherFromInput(location) {
    let coords = await this.getCoordinates(location);
    this.setCurrentData(coords);
  }

  //Funkcja pozyskująca koordynaty dzięki geolokalizacji
  async useGeolocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setCurrentData([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      });
    } else {
      console.log("geolocation unavailable");
    }
  }

  //Funkcja pozyskująką aktualną pogodę na podstawie koordynatów
  async getCurrentData(coordinates) {
    const response = await fetch(
      "https://api.openweathermap.org/data/2.5/weather?lat=" +
        coordinates[0] +
        "&lon=" +
        coordinates[1] +
        "&appid=93306e7b1c2d7e5a1cfcd5271a751dd0",
      { method: "GET" }
    );
    const json = await response.json();

    return json;
  }

  //Funkcja ustawiająca state
  async setCurrentData(coordinates) {
    let weatherData;
    let forecastData;

    try {
      weatherData = await this.getCurrentData(coordinates);
      forecastData = await this.getForecast(coordinates);
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

  async getForecast(coordinates) {
    const response = await fetch(
      "http://api.openweathermap.org/data/2.5/forecast?lat=" +
        coordinates[0] +
        "&lon=" +
        coordinates[1] +
        "&appid=93306e7b1c2d7e5a1cfcd5271a751dd0",
      { method: "GET" }
    );
    const json = await response.json();

    return json;
  }

  handleLocation = (location) => {
    this.setState({ location: location });
    this.weatherFromInput(location);
  };

  handleGeolocation = () => {
    if (this.state.geolocation === false) {
      this.setState({ geolocation: true });
      this.useGeolocation();
    } else {
      this.setState({ geolocation: false });
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
            ifEnabled={this.state.geolocation}
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
