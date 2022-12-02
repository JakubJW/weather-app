import React from "react"
import ForecastCarousel from "./ForecastCarousel"

class WeatherForecast extends React.Component {

    render() {
        return(
           <div className="flex p-4 flex-col gap-4">
                <ForecastCarousel data = {this.props.forecastData.day1} isDataSet = {this.props.isDataSet}/>
                <ForecastCarousel data = {this.props.forecastData.day2} isDataSet = {this.props.isDataSet}/>
                <ForecastCarousel data = {this.props.forecastData.day3} isDataSet = {this.props.isDataSet}/>
                <ForecastCarousel data = {this.props.forecastData.day4} isDataSet = {this.props.isDataSet}/>
                <ForecastCarousel data = {this.props.forecastData.day5} isDataSet = {this.props.isDataSet}/>
           </div>
        )
    }
} export default WeatherForecast