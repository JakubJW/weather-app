import React from "react";
import { MdOutlineNavigateNext } from "react-icons/md";
import { MdNavigateBefore } from "react-icons/md";

class ForecastCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: 0,
      transition: false,
    };
  }

  dateConvert(data) {
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const d = new Date(data);
    let day = weekday[d.getDay()];
    let hour = d.getUTCHours();
    return day + " " + hour + ":00";
  }

  transition() {
    this.setState({ transition: true });
    setTimeout(() => {
      this.setState({ transition: false });
    }, 300);
  }

  nextSlide = () => {
    this.transition();
    setTimeout(() => {
      if (this.state.currentSlide < this.props.data.length - 1) {
        this.setState((prevState) => ({
          currentSlide: prevState.currentSlide + 1,
        }));
      } else {
        this.setState({ currentSlide: 0 });
      }
    }, 300);
  };

  prevSlide = () => {
    this.transition();
    setTimeout(() => {
      if (this.state.currentSlide === 0) {
        this.setState({ currentSlide: this.props.data.length - 1 });
      } else {
        this.setState((prevState) => ({
          currentSlide: prevState.currentSlide - 1,
        }));
      }
    }, 300);
  };

  render() {
    let display;
    let image;

    if (this.props.isDataSet) {
      const iconUrl =
        "http://openweathermap.org/img/wn/" +
        this.props.data[this.state.currentSlide].weather[0].icon +
        "@2x.png";
      image = <img className="contain h-16 w-16" src={iconUrl} alt="" />;
      display = (
        <div
          className={
            "flex items-center justify-center " +
            (this.state.transition
              ? "opacity-0 transition-opacity"
              : "opacity-1 transition-opacity")
          }
        >
          {image}
          <div>
            <p>
              {this.dateConvert(
                this.props.data[this.state.currentSlide].dt_txt
              )}
            </p>
            <p className="text-xl font-bold">
              {this.props.data[this.state.currentSlide].weather[0].main}
            </p>
            <p className="font-bold text-primary">
              {(
                this.props.data[this.state.currentSlide].main.temp - 270
              ).toFixed() + "°C"}
            </p>
          </div>
        </div>
      );
    } else display = "-";

    return (
      <div className="flex h-24 md:w-96 items-center justify-between rounded-xl bg-base-300 p-4 shadow-lg">
        <button
          className="btn-ghost btn-circle btn hover:bg-primary hover:bg-opacity-20"
          onClick={this.prevSlide}
        >
          <MdNavigateBefore className="text-primary" />
        </button>

        {display}

        <button
          className="btn-ghost btn-circle btn hover:bg-primary hover:bg-opacity-20"
          onClick={this.nextSlide}
        >
          <MdOutlineNavigateNext className="text-primary" />
        </button>
      </div>
    );
  }
}
export default ForecastCarousel;
