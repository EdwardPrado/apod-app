import React, { useEffect, useState } from "react";
import "./card.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Card = (props) => {
	const [like, setLike] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = React.useState(false);

	const handleLikeClick = (bool, cardObject) => {
		setLike(bool);
		handleLikeStorageUpdate(bool, cardObject);
	};

	const handleLikeStorageUpdate = (bool, cardObject) => {
		let storage = [];

		if (localStorage.getItem("nasa-apod_storage") !== null) {
			storage = JSON.parse(localStorage.getItem("nasa-apod_storage")) || [];
		}

		if (bool) {
			storage.push(cardObject);
		} else {
			let newStorage = storage.filter((entry) => entry.date !== props.date);
			storage = newStorage;
		}

		localStorage.setItem("nasa-apod_storage", JSON.stringify(storage));
	};

	const handleShareClick = (url) => {
		navigator.clipboard.writeText(url);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	//Only runs on initial render
	useEffect(() => {
		if (props.date !== null) {
			let storage = [];

			if (localStorage.getItem("nasa-apod_storage") !== null) {
				storage = JSON.parse(localStorage.getItem("nasa-apod_storage")) || [];
			}

			if (storage.some((entry) => entry.date === props.date)) {
				setLike(true);
			}
		}
	}, []);

	const action = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<div className="space-card" key={props.date}>
			{props.mediaType === "video" ? (
				<iframe
					width="100%"
					height="315"
					src={props.mediaURL}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			) : props.mediaType === "image" ? (
				<img src={props.mediaURL} alt={props.title + " photo."}></img>
			) : null}
			<div className="space-card_content">
				<span>{props.date}</span>
				<h3>{props.title}</h3>
				<p>{props.explanation}</p>
				{like ? (
					<FavoriteIcon className="icon_like_fill" onClick={() => handleLikeClick(false, props)} />
				) : (
					<FavoriteBorderIcon className="icon_like" onClick={() => handleLikeClick(true, props)} />
				)}
				<SendIcon className="icon" onClick={() => handleShareClick(props.mediaURL)} />
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				message={`Copied ${props.title} ${props.mediaType}`}
				action={action}
			/>
		</div>
	);
};

export default Card;
