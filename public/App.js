import "bootstrap/dist/css/bootstrap.css";
import "./App.css";

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CityWeeklyForecast from "./components/CityWeeklyForecast";
import TodayCityWeather from "./components/TodayCityWeather";



const citiesOptions = [
	{ code: 213225, name: "Jerusalem" },
	{ code: 213181, name: "Haifa" },
	{ code: 215854, name: "Tel Aviv" },
];

export default function App() {
	return (
		<Router>
			<div className="App">
				<h1 className="m-5">Weather Forecast</h1>
				<div className="container mx-auto mt-2 gray rounded text-white p-1">
					<img
						src="/static/cloud-blue-sky.jpg"
						class="img-fluid"
						alt="..."
					/>
					<Switch>
						<Route exact path="/">
							<ul className="city-cards">
								{citiesOptions.map(TodayCityWeather)}
							</ul>
						</Route>
						<Route path="/:id" children={<CityWeeklyForecast />} />
					</Switch>
				</div>
			</div>
		</Router>
	);
}
