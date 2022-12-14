import React from "react";
import { BiCurrentLocation } from "react-icons/bi";


class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      geolocation: false,
      location: "",
      isTouch: null
    };
  };

  submitLocation = (event) => {
    event.preventDefault();
    this.props.submitLocation(this.state.location);
  }

  enableGeolocation = () => {
    if(this.state.geolocation === false)
    {
      this.setState({geolocation: true})
      this.props.enableGeolocation(true);
    } else {
      this.setState({geolocation: false})
    }
  }

  handleInput = (event) => {
    this.setState({ location: event.target.value });
  }

  render() {
    return (
      <div className="md:w-96">
        <form className="flex w-full items-center justify-between gap-4">
          <input
            className="input-secondary input w-3/5 "
            type="text"
            placeholder="Location"
            value={this.state.location}
            onChange={this.handleInput}
            disabled={this.state.geolocation}
          />

          <div className="tooltip tooltip-info" data-tip="Use current location">
            <button
              type="button"
              className={
                "btn-square btn " +
                (this.state.geolocation ? "btn-secondary" : "btn-secondary btn-outline")
              }
              onClick={this.enableGeolocation}
            >
              <BiCurrentLocation
                className={
                  "text-2xl " + (this.state.geolocation ? "text-white" : "")
                }
              />
            </button>
          </div>

          <button
            className={
              "btn-secondary btn shrink " +
              (this.state.geolocation ? "btn-disabled" : "")
            }
            type="submit"
            onClick={this.submitLocation}
          >
            Submit
          </button>
        </form>
      </div>
    );
  }

} export default ControlPanel;
