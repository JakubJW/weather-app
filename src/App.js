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

  async getCoordinates(location) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {
        method: 'GET'})
    .then((res) => res.json())
    .then((res) => {
        fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + res[0].lat + '&lon=' + res[0].lon +  '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
        .then((res) => res.json())
        .then((res) => this.setState(() => ({ 
          currentData: {
            mainWeather: res.weather[0].main,
            icon: res.weather[0].icon,
            temp: (res.main.temp - 270).toFixed() + "°C",
            feelsLike: (res.main.feels_like - 270).toFixed() + "°C",
            pressure: res.main.pressure + "hPa",
            humidity: res.main.humidity + "%",
            windSpeed: res.wind.speed + "m/s",
          }
        }))
      ).then(this.setState({isDataSet: true}))
    })
  }

  getForecast(location) {
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + location + '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {
        method: 'GET',})
    .then((res) => res.json())
    .then((res) => {
      fetch('http://api.openweathermap.org/data/2.5/forecast?lat=' + res[0].lat + '&lon=' + res[0].lon + '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
      .then((res) => res.json())
      .then((res) => {
        var day1 = []
        var day2 = []
        var day3 = []
        var day4 = []
        var day5 = []
        for(var item in res.list) {
          if(item <= 7) {
            day1.push(res.list[item])
          } else if (item > 7 && item <= 15) {
            day2.push(res.list[item])
          } else if (item > 15 && item <= 23) {
            day3.push(res.list[item])
          } else if (item > 23 && item <= 31) {
            day4.push(res.list[item])
          } else if (item > 31 && item <= 39) {
            day5.push(res.list[item])
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
      }).then(this.setState({isDataSet: true}))
    })  
  }

  useGeolocation = () => {
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition((position) => {
            fetch('https://api.openweathermap.org/data/2.5/weather?lat=' + position.coords.latitude + '&lon=' + position.coords.longitude +  '&appid=93306e7b1c2d7e5a1cfcd5271a751dd0', {method: 'GET'})
            .then((res) => res.json())
            .then((res) => this.setState(() => ({
              currentData: {
                mainWeather: res.weather[0].main,
                icon: res.weather[0].icon,
                temp: (res.main.temp - 270).toFixed() + "°C",
                feelsLike: (res.main.feels_like - 270).toFixed() + "°C",
                pressure: res.main.pressure + "hPa",
                humidity: res.main.humidity + "%",
                windSpeed: res.wind.speed + "m/s",
              }
            })
          )).then(this.setState({isDataSet: true}))
        })
    } else {
        console.log('geolocation unavailable')
    }
  }

  handleLocation = (location) => {
    this.setState({'location': location})
    this.getCoordinates(location)
    this.getForecast(location)
    
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
