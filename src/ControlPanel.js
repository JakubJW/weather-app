import React from "react";
import {BiCurrentLocation} from 'react-icons/bi'

class ControlPanel extends React.Component {
    constructor() {
        super()
        this.state = {
            geolocation: false,
            location: ''
        }
    }

    submitLocation = (event) => {
        event.preventDefault()
        this.props.submitLocation(this.state.location)
    }

    enableGeolocation = () => {
        this.setState({'geolocation': !this.state.geolocation})
        this.props.enableGeolocation()
    }

    handleInput = (event) => {
        this.setState({'location': event.target.value})
    }

    render(){
        return(
            <div>
                <form className="flex items-center gap-4" >
                    <input className="input grow input-secondary bg-slate-600 " type="text" placeholder="Location" value={this.state.location} onChange={this.handleInput} disabled={this.state.geolocation}/> 
                            
                    <div className="tooltip " data-tip="Use current location">
                        <button type="button" className={"btn btn-circle btn-outline btn-secondary " + (this.state.geolocation ? 'bg-secondary' : '')} onClick={ this.enableGeolocation }>
                            <BiCurrentLocation className={"text-2xl " + (this.state.geolocation ? 'text-white' : '')}/>
                        </button>
                    </div>
                            
                    <button className={"btn grow btn-secondary " + (this.state.geolocation ? 'btn-disabled' : '')} type="submit" onClick={this.submitLocation}>Submit</button>
                </form> 
            </div>
        )
    }
} export default ControlPanel