import React from "react"
import {TiWeatherWindy} from 'react-icons/ti' 
import {CiTempHigh} from 'react-icons/ci'
import {MdOutlineWaterDrop} from 'react-icons/md'
import DataDisplay from './DataDisplay'

class CurrentWeather extends React.Component {

    render() {
        let image
        if(this.props.currentData.icon.length!==0) {
            const iconUrl = 'http://openweathermap.org/img/wn/' + this.props.currentData.icon + '@2x.png';
            image = <img className="contain h-24 w-24" src={iconUrl} alt="" />
        }

        return( 
               <div className="card box-border justify-center flex-col gap-4 p-4">
                              
                    
                        <div className="flex flex-col gap-4 relative">
                            <div className="flex justify-between bg-slate-600 h-44 rounded-xl" >
                                <div className="flex flex-col items-center w-2/5 justify-center p-4 box-border text-center">
                                    {image}
                                    <p className="text-4xl font-bold">{this.props.currentData.mainWeather}</p>
                                </div>
                                <div className="my-auto w-2/5 p-4 box-border text-center">
                                    <p className="text-4xl font-bold">{this.props.currentData.temp}</p>   
                                </div>
                            </div>

                            <div className="flex justify-between bg-slate-600  rounded-xl">
                                <DataDisplay value={this.props.currentData.feelsLike} valueName='Feels like' icon={<CiTempHigh className="text-3xl"/>} />
                                <DataDisplay value={this.props.currentData.windSpeed} valueName='Wind speed' icon={<TiWeatherWindy className="text-3xl" />}/>
                            </div>
                            
                            <div className="flex justify-between bg-slate-600 rounded-xl">
                                <DataDisplay value={this.props.currentData.humidity} valueName="Humidity" icon={<MdOutlineWaterDrop className="text-3xl" />}/>
                                <DataDisplay value={this.props.currentData.pressure} valueName='Pressure' icon={<CiTempHigh className="text-3xl" />} />
                            </div>
                        </div>
                </div>
        )
    }
}

export default CurrentWeather