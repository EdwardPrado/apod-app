import React, { useState, useEffect } from "react";
import "./likes.scss";

import ThumbnailGrid from "../../components/ThumbnailGrid/ThumbnailGrid";

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
				cardArr.push({
					title: storage[i].title,
					date: storage[i].date,
					explanation: storage[i].explanation,
					media_type: storage[i].media_type,
					url: storage[i].url,
					thumbnail_url: storage[i].thumbnail_url,
				});
			}

			setIsLoading(false);

			//Reverse the array so that the most recent entry is first
			setCards(cardArr.reverse());
		} else {
			setCards([]);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="card-thumbnail_container">
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
			{cards.length > 0 ? <ThumbnailGrid cards={cards} /> : <h3>Like a post to see it here</h3>}
		</div>
	);
};

export default Likes;
