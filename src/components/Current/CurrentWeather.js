import React from "react";
import { TiWeatherWindy } from "react-icons/ti";
import { CiTempHigh } from "react-icons/ci";
import { MdOutlineWaterDrop } from "react-icons/md";
import DataDisplay from "./DataDisplay";

class CurrentWeather extends React.Component {
  render() {
    let image;
    if (this.props.currentData.icon.length !== 0) {
      const iconUrl =
        "http://openweathermap.org/img/wn/" +
        this.props.currentData.icon +
        "@2x.png";
      image = <img className="contain h-28 w-28" src={iconUrl} alt="" />;
    }

    return (
      <div className="card flex md:w-96 flex-col justify-between gap-4">
        <div className="flex grow flex-col justify-end gap-4">
          <div className="flex h-52 justify-between rounded-xl bg-base-300 shadow-lg">
            <div className="box-border flex flex-col items-center justify-center p-4 ">
              {image}
              <p className="text-4xl font-bold">
                {this.props.currentData.mainWeather}
              </p>
            </div>
            <div className="my-auto box-border w-3/6 p-4 text-center">
              <p className="text-6xl font-bold text-primary">
                {this.props.currentData.temp}
              </p>
            </div>
          </div>

          <div className="flex h-24 justify-between rounded-xl bg-base-300 shadow-lg">
            <DataDisplay
              value={this.props.currentData.feelsLike}
              valueName="Feels like"
              icon={<CiTempHigh className="text-3xl text-primary" />}
            />
            <DataDisplay
              value={this.props.currentData.windSpeed}
              valueName="Wind speed"
              icon={<TiWeatherWindy className="text-3xl text-primary" />}
            />
          </div>

          <div className="flex h-24 justify-between rounded-xl bg-base-300 shadow-lg">
            <DataDisplay
              value={this.props.currentData.humidity}
              valueName="Humidity"
              icon={<MdOutlineWaterDrop className="text-3xl text-primary" />}
            />
            <DataDisplay
              value={this.props.currentData.pressure}
              valueName="Pressure"
              icon={<CiTempHigh className="text-3xl text-primary" />}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CurrentWeather;
