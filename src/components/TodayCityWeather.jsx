import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "../App.css";
import { fetchAllCities } from "../redux/store";
import { SingleDayWeather } from "./SingleDayWeather";

export default function TodayCityWeather(city) {
	const weatherData = useSelector((state) => state.weather.data);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!weatherData[city.code]) {
			dispatch(fetchAllCities(city.code));
		}
	}, [weatherData[city.code], dispatch]);

	function celciusConverter(degree) {
		const c = ((parseInt(degree) - 32) * 5) / 9;
		return c.toFixed();
	}

	if (!weatherData[city.code]) return "loading...";

	const todayData = weatherData[city.code].DailyForecasts[0];

	return (
		<li key={city.code} className="city-card">
			<Link to={`/${city.code}`}>
				{todayData && (
					<SingleDayWeather
						selectedCity={city.name}
						key={todayData.EpochDate}
						dayDate={todayData.Date}
						dayIcon={todayData.Day.Icon}
						dayMaxTemp={celciusConverter(todayData.Temperature.Maximum.Value)}
						dayMinTemp={celciusConverter(todayData.Temperature.Minimum.Value)}
					/>
				)}
			</Link>
		</li>
	);
}
