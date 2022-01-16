import React, { useState, useEffect } from "react";
import "./likes.scss";

import CardThumbnail from "../../components/cardThumbnail/CardThumbnail";

import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const Likes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [cards, setCards] = useState([]);

	useEffect(() => {
		let storage = JSON.parse(localStorage.getItem("nasa-apod_storage"));

		if (storage !== null && storage.length !== 0) {
			let cardArr = [];

			for (let i = 0; i < storage.length; i++) {
				cardArr.push(
					<CardThumbnail
						title={storage[i].title}
						date={storage[i].date}
						explanation={storage[i].explanation}
						mediaType={storage[i].mediaType}
						mediaURL={storage[i].mediaURL}
						thumbnailURL={storage[i].thumbnail_url}
					/>
				);
			}

			setIsLoading(false);

			//Reverse the array so that the most recent entry is first
			setCards(cardArr.reverse());
		} else {
			setCards([<h3>Like a post to see it here</h3>]);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="card-thumbnail_container">
			<div className="card-thumbnail_grid">
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
