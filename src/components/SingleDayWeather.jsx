import React from "react";
import Moment from "react-moment";

export const SingleDayWeather = ({
  selectedCity,
  dayDate,
  dayIcon,
  dayMinTemp,
  dayMaxTemp,
}) => {
  return (
    <div
      className="single-day"
    >
      <div className="flex-row bd-highlight m-2 p-2">
        <h2>
          {selectedCity}
        </h2>
        <h3>
          <Moment format="dddd">{dayDate}</Moment>
        </h3>
        <img
          className="small-image"
          src={`https://developer.accuweather.com/sites/default/files/${
            dayIcon >= 10 ? dayIcon : "0" + dayIcon
          }-s.png`}
          alt="weather-icon"
        />
        <h4>{`${dayMaxTemp}° - ${dayMinTemp}°`}</h4>
      </div>
    </div>
  );
};