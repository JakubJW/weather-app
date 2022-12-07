import React from "react";
import { BiCurrentLocation } from "react-icons/bi";

class ControlPanel extends React.Component {
  constructor() {
    super();
    this.state = {
      geolocation: false,
      location: "",
    };
  }

  submitLocation = (event) => {
    event.preventDefault();
    this.props.submitLocation(this.state.location);
  };

  enableGeolocation = () => {
    this.setState({ geolocation: !this.state.geolocation });
    this.props.enableGeolocation();
  };

  handleInput = (event) => {
    this.setState({ location: event.target.value });
  };

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

          <div className="tooltip " data-tip="Use current location">
            <button
              type="button"
              className={
                "btn-outline btn-secondary btn-circle btn " +
                (this.props.ifEnabled ? "bg-secondary" : "")
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
}
export default ControlPanel;
