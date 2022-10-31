import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import "../App.css";
import { fetchAllCities } from "../redux/store";
import { SingleDayWeather } from "./SingleDayWeather";

export default function CityWeeklyForecast() {
	let { id } = useParams();
	const weatherData = useSelector((state) => state.weather.data);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!weatherData[id]) {
			dispatch(fetchAllCities(id));
		}
	}, [weatherData[id], dispatch]);

	function celciusConverter(degree) {
		const c = ((parseInt(degree) - 32) * 5) / 9;
		return c.toFixed();
	}

	if (!weatherData[id]) return "loading...";

	const cityData = weatherData[id].DailyForecasts;

	return (
		<div>
			<Link to="/">{<h4>Go Back</h4>}</Link>
			<div className="weekly-forecast d-flex justify-content-between">
				{cityData &&
					cityData.map((day, index) => (
						<SingleDayWeather
							key={day.EpochDate}
							dayDate={day.Date}
							dayIcon={day.Day.Icon}
							dayMaxTemp={celciusConverter(day.Temperature.Maximum.Value)}
							dayMinTemp={celciusConverter(day.Temperature.Minimum.Value)}
						/>
					))}
			</div>
		</div>
	);
}
