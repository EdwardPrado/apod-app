import React, { useEffect, useState } from "react";
import "./home.scss";

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
	const [endDate, setEndDate] = useState(new Date());

	const handleLoadMore = () => {
		getLastSevenPODs();
	};

	const getLastSevenPODs = () => {
		setIsError(false);
		setIsLoading(true);

		let startDate = new Date(endDate);
		var parsedEndDate = new Date(endDate);

		//Subtract 6 to set the start day back by 6 days before the end date
		startDate.setDate(startDate.getDate() - 6);

		axios({
			method: "GET",
			url: "/.netlify/functions/get-apod",
			params: {
				start_date: startDate.toISOString().split("T")[0],
				end_date: parsedEndDate.toISOString().split("T")[0],
				thumbs: true,
			},
		})
			.then((response) => {
				//Reverse the array so it's in chronological order
				const data = response.data.reverse();
				let cardArr = cards === 0 ? [] : cards;

				for (const card of data) {
					cardArr.push(card);
				}

				setCards(cardArr);

				//Subtract 1 or else the next call will include the last day
				startDate.setDate(startDate.getDate() - 1);
				setEndDate(startDate);

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
		getLastSevenPODs();
	}, []);

	return (
		<div className="card-container">
			{cards.map((card) => (
				<Card key={card.date} {...card} />
			))}
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
	);
};

export default Home;
