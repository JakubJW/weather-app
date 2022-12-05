import CurrentWeather from "./CurrentWeather";
import WeatherForecast from "./WeatherForecast";
import ControlPanel from "./ControlPanel";
import React from "react";

class App extends React.Component {
  
  constructor(){
    super()
    this.state = {
      location: '',
      isDataSet: false,
      currentData: {
        feelsLike: '',
        humidity: '',
        icon: '',
        mainWeather: '',
        pressure: '',
        temp: '',
        windSpeed: ''
      },
      forecastData: {}
    }
  }

  //Funkcja pozyskująca koordynaty po wpisaniu lokalizacji
  async getCoordinates(location) {
    let coordinates = []

    const response = await fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
    const json =  await response.json()

    coordinates[0] = json[0].lat
    coordinates[1] = json[0].lon

    return coordinates
  }

  async weatherFromInput(location) {
    let coords = await this.getCoordinates(location)
    this.setCurrentData(coords)
  }

  //Funkcja pozyskująca koordynaty dzięki geolokalizacji
  async useGeolocation() {
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.setCurrentData([position.coords.latitude, position.coords.longitude])
      })
    } else {
        console.log('geolocation unavailable')
    }
  }

  //Funkcja pozyskująką aktualną pogodę na podstawie koordynatów
  async getCurrentData(coordinates) {
    const response = await fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + coordinates[0] + '&lon=' + coordinates[1] +  '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
    const json = await response.json()
    
    return json
  }

  //Funkcja ustawiająca state 
  async setCurrentData(coordinates) {
    let weatherData
    let forecastData

    try {
      weatherData = await this.getCurrentData(coordinates)
      forecastData = await this.getForecast(coordinates)
    } catch (e) {
      console.log(e)
      console.log("Error!")
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
      }
    }))

      var day1 = []
      var day2 = []
      var day3 = []
      var day4 = []
      var day5 = []
      for(var item in forecastData.list) {
        if(item <= 7) {
          day1.push(forecastData.list[item])
        } else if (item > 7 && item <= 15) {
          day2.push(forecastData.list[item])
        } else if (item > 15 && item <= 23) {
          day3.push(forecastData.list[item])
        } else if (item > 23 && item <= 31) {
          day4.push(forecastData.list[item])
        } else if (item > 31 && item <= 39) {
          day5.push(forecastData.list[item])
        }
      }
      this.setState(() => ({
        forecastData: {
          day1: day1,
          day2: day2,
          day3: day3,
          day4: day4,
          day5: day5
        }
      }))
      
      this.setState({isDataSet: true})
  }

  async getForecast(coordinates) {
      const response = await fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + coordinates[0] + '&lon=' + coordinates[1] + '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
      const json = await response.json()

      return json
    }


  handleLocation = (location) => {
    this.setState({'location': location})
    this.weatherFromInput(location)
  }
  
  handleGeolocation = () => {
    console.log('geolocation enabled')
    this.useGeolocation()
  }

  render() {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen mx-auto">
        <ControlPanel submitLocation = { this.handleLocation } enableGeolocation = { this.handleGeolocation }/>
        <div className="flex">
          <CurrentWeather currentData = {this.state.currentData} />  
          <div className="flex flex-col gap-4  rounded-lg">
            <WeatherForecast forecastData = {this.state.forecastData} isDataSet = { this.state.isDataSet }/>  
          </div>
        </div>
      </div>
    )
  }
}

export default App;
