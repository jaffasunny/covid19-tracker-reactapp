import {
	Card,
	CardContent,
	FormControl,
	MenuItem,
	Select,
} from "@mui/material";
import { useEffect, useState } from "react";
import "./App.css";
import InfoBox from "./InfoBox";
import Map from "./Map";

const App = () => {
	const [countries, setCountries] = useState([]);
	const [country, setCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});

	// Need this to execute when the component loads because of
	// the worldwide value that is set at the initial point
	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((res) => res.json())
			.then((data) => setCountryInfo(data));
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch("https://disease.sh/v3/covid-19/countries").then((res) => {
				res.json().then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					setCountries(countries);
				});
			});
		};

		getCountriesData();
	}, []);

	const onCountryChange = async (e) => {
		const countryCode = e.target.value;
		setCountry(countryCode);

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;

		await fetch(url)
			.then((res) => res.json())
			.then((data) => {
				setCountry(countryCode);
				setCountryInfo(data);
			});
	};

	console.log(countryInfo);

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 TRACKER</h1>
					<FormControl className="app__dropdown">
						<Select
							variant="outlined"
							value={country}
							onChange={onCountryChange}>
							<MenuItem value="worldwide">Worldwide</MenuItem>

							{countries.map((country, index) => {
								return (
									<MenuItem key={index} value={country.value}>
										{country.name}
									</MenuItem>
								);
							})}
						</Select>
					</FormControl>
				</div>

				<div className="app__stats">
					<InfoBox
						title="Coronavirus Cases"
						cases={countryInfo.todayCases}
						total={countryInfo.cases}
					/>
					<InfoBox
						title="Recovered"
						cases={countryInfo.todayRecovered}
						total={countryInfo.recovered}
					/>
					<InfoBox
						title="Deaths"
						cases={countryInfo.todayDeaths}
						total={countryInfo.deaths}
					/>
				</div>

				<Map />
			</div>

			<Card className="app__right">
				<CardContent>
					<h3>Live Cases by Country</h3>
					<h3>Worldwide new cases</h3>
				</CardContent>
			</Card>
		</div>
	);
};

export default App;
