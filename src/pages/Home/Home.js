import React, { useEffect, useState } from "react";
import "./home.scss";

import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/card/Card";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";
import Button from "@mui/material/Button";

const Home = () => {
	const [isLoading, setIsLoading] = useState();
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [cards, setCards] = useState([]);
	const [endDate, setEndDate] = useState(Date);

	const handleLoadMore = () => {
		callAPI();
	};

	const callAPI = () => {
		setIsError(false);
		setIsLoading(true);

		let startDate = new Date(endDate);
		var parsedEndDate = new Date(endDate);

		//Subtract 6 to set the start day back by 6 days before the end date
		startDate.setDate(startDate.getDate() - 6);

		axios({
			method: "GET",
			url: "https://api.nasa.gov/planetary/apod",
			params: {
				api_key: "mLDDGsKxXZXy6pvJuGI7Adk5xHK1zczZ5vkRKIhj",
				start_date: startDate.toISOString().split("T")[0],
				end_date: parsedEndDate.toISOString().split("T")[0],
			},
		})
			.then((response) => {
				//Reverse the array so it's in chronological order
				let res = response.data.reverse();
				let cardArr = [];

				if (cards.length !== 0) {
					cardArr = [cards];
				}

				for (let i = 0; i < res.length; i++) {
					let storage = [];
					let isLiked = false;

					if (localStorage.getItem("nasa-apod_storage") !== null) {
						storage = JSON.parse(localStorage.getItem("nasa-apod_storage"));
					}

					if (storage.some((entry) => entry.date === res[i].date)) {
						isLiked = true;
					}

					cardArr.push(
						<Card
							title={res[i].title}
							date={res[i].date}
							explanation={res[i].explanation}
							mediaType={res[i].media_type}
							mediaURL={res[i].url}
							isLiked={isLiked}
						/>
					);
				}

				startDate.setDate(startDate.getDate() - 1);
				setEndDate(startDate);

				setCards(cardArr);

				setIsLoading(false);
			})
			.catch(function (error) {
				if (error.response) {
					//Error response from server
					setIsLoading(false);
					setIsError(true);
					setErrorMessage("Error: Server encountered error with request");
				} else if (error.request) {
					//Error where no response was received
					setIsLoading(false);
					setIsError(true);
					setErrorMessage("Error:  No response received");
				} else {
					//Error with the setup of the request
					setIsLoading(false);
					setIsError(true);
					setErrorMessage("Error:  An issue occurred with your request");
				}
			});
	};

	useEffect(() => {
		setIsLoading(true);
		callAPI();
	}, []);

	return (
		<div>
			<Navbar />
			<div className="card-container">
				{cards}
				{isError ? <h3 className="loading_error">{errorMessage}</h3> : null}
				{isLoading ? (
					<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
						<CircularProgress />
					</Backdrop>
				) : isError ? null : (
					<span onClick={() => handleLoadMore()}>
						<Button className="btn_load-more" variant="contained">
							Load More
						</Button>
					</span>
				)}
			</div>
		</div>
	);
};

export default Home;
