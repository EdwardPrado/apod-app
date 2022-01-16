import React, { useEffect, useState, useRef } from "react";
import "./card.scss";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const Card = (props) => {
	const [like, setLike] = useState(false);
	const savedLike = useRef(props.like !== undefined ? props.like : false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [isEllipsis, setIsEllipsis] = useState(true);

	//Pass in boolean since setting the like hook
	//to the opposite of its current value doesn't
	//update the hook properly.
	const handleLikeClick = (bool) => {
		setLike(bool);
		handleLikeStorageUpdate(bool);
	};

	const handleLikeStorageUpdate = (bool) => {
		let storage = [];

		if (localStorage.getItem("nasa-apod_storage") !== null) {
			storage = JSON.parse(localStorage.getItem("nasa-apod_storage")) || [];
		}

		if (bool) {
			storage.push(props);
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

	const handleSnackbarClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	const handleMoreExplanation = () => {
		setIsEllipsis(false);
	};

	useEffect(() => {
		if (props.date !== null) {
			let storage = [];

			if (localStorage.getItem("nasa-apod_storage") !== null) {
				storage = JSON.parse(localStorage.getItem("nasa-apod_storage"));

				if (storage.some((entry) => entry.date === props.date)) {
					setLike(true);
				}
			}
		}
	});

	const action = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	return (
		<article className="space-card">
			<div className="space-card_content">
				<span>{props.date}</span>
				<h3>{props.title}</h3>
			</div>
			{props.media_type === "video" ? (
				<iframe
					width="100%"
					height="315"
					src={props.url}
					title="YouTube video player"
					frameBorder="0"
					allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
					allowFullScreen
				></iframe>
			) : props.media_type === "image" ? (
				<img src={props.url} alt={props.title + " photo."} loading="lazy"></img>
			) : null}
			<div className="space-card_content">
				{like ? (
					<FavoriteIcon className="icon_like_fill" onClick={() => handleLikeClick(false)} />
				) : (
					<FavoriteBorderIcon className="icon_like" onClick={() => handleLikeClick(true)} />
				)}
				<SendIcon className="icon" onClick={() => handleShareClick(props.url)} />
				<Typography noWrap={isEllipsis}>{props.explanation}</Typography>
				{isEllipsis ? (
					<Button variant="outlined" onClick={() => handleMoreExplanation()}>
						Show More
					</Button>
				) : null}
			</div>
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				message={`Copied ${props.title} ${props.media_type} link`}
				action={action}
			/>
		</article>
	);
};

export default Card;
