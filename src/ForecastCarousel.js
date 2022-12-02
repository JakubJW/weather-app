import React from "react"
import {MdOutlineNavigateNext} from "react-icons/md"
import {MdNavigateBefore} from 'react-icons/md'

class ForecastCarousel extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            currentSlide: 0
        }
    }

    nextSlide = () => {
        if(this.state.currentSlide < this.props.data.length - 1) {
            this.setState((prevState) => ({
                currentSlide: prevState.currentSlide + 1
            }))
        } else {
            this.setState({currentSlide: 0})
        }
    }

    prevSlide = () => {
        if(this.state.currentSlide === 0) {
            this.setState({currentSlide: this.props.data.length - 1})
        } else {
            this.setState((prevState) => ({
                currentSlide: prevState.currentSlide - 1
            }))
        }
    }
    

    render() {
        let display
        let image
        if(this.props.data) {
            const iconUrl = 'http://openweathermap.org/img/wn/' + this.props.data[this.state.currentSlide].weather[0].icon + '@2x.png';
            image = <img className="contain h-16 w-16" src={iconUrl} alt="" />
            display = <div className="flex items-center bg-slate-600 overflow-hidden">
                        {image}
                        <div>
                            <p>{this.props.data[this.state.currentSlide].dt_txt}</p>
                            <p className="text-xl font-bold">{this.props.data[this.state.currentSlide].weather[0].main}</p>
                            <p className="font-bold">{(this.props.data[this.state.currentSlide].main.temp - 270).toFixed() + "°C"}</p>    
                        </div>
                    </div> 
        } else
            display = 'nie ma danych'
        
            return(
            <div className="carousel items-center justify-between w-96 bg-slate-600 rounded-xl p-4">
                <button className="btn btn-circle btn-ghost" onClick = {this.prevSlide}>
                            <MdNavigateBefore />
                        </button> 
                        
                        {display}
                        
                        <button className="btn btn-circle btn-ghost" onClick={this.nextSlide}>
                            <MdOutlineNavigateNext />
                        </button>
                </div>
            
        )
    }

}   export default ForecastCarousel