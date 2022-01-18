import React, { useState, useEffect } from "react";
import "./likes.scss";

import ThumbnailGrid from "../../components/ThumbnailGrid/ThumbnailGrid";

import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

const Likes = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [cards, setCards] = useState([]);
	const [dimensionalCardArray, setDimensionalCardArray] = useState();

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

			setDimensionalCardArray(
				new Array(cardArr.length).fill(null).map((item, index) => {
					return {
						...cardArr[index],
					};
				})
			);
		} else {
			setCards([<h3>Like a post to see it here</h3>]);
			setIsLoading(false);
		}
	}, []);

	return (
		<div className="card-thumbnail_container">
			<h1>Likes</h1>
			{isLoading ? (
				<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
					<CircularProgress />
				</Backdrop>
			) : null}
			{cards.length !== 0 ? (
				<ThumbnailGrid
					cards={cards}
					dimensionalCardArray={dimensionalCardArray}
					columnCount={3}
					rowHeight={332}
					columnWidth={332}
					height={600}
					width={1000}
				/>
			) : null}
		</div>
	);
};

export default Likes;
