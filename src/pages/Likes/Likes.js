import React, { useState, useEffect } from "react";
import "./likes.scss";

import Navbar from "../../components/Navbar/Navbar";
import Card from "../../components/card/Card";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Likes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [cards, setCards] = useState([]);

	useEffect(() => {
		let storage = JSON.parse(localStorage.getItem("nasa-apod_storage"));

		if (storage.length !== 0) {
			let cardArr = [];

			for (let i = 0; i < storage.length; i++) {
				cardArr.push(
					<Card
						title={storage[i].title}
						date={storage[i].date}
						explanation={storage[i].explanation}
						mediaType={storage[i].mediaType}
						mediaURL={storage[i].mediaURL}
					/>
				);
			}

			setIsLoading(false);

			//Reverse the array so that the most recent entry is first
			setCards(cardArr.reverse());
		} else {
		}
	}, []);

	return (
		<div>
			<Navbar />
			<div className="card-container">
				{isLoading ? (
					<Box
						sx={{
							top: 0,
							left: 0,
							bottom: 0,
							right: 0,
							position: "absolute",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<div className="loading_backdrop"></div>
						<CircularProgress />
					</Box>
				) : null}
				{cards}
			</div>
		</div>
	);
};

export default Likes;
