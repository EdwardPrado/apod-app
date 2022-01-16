import React, { useState, useEffect } from "react";
import "./date.scss";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import SendIcon from "@mui/icons-material/Send";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

const Date = () => {
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [dateData, setDateData] = useState({});
	const [like, setLike] = useState(false);
	const [snackbarOpen, setSnackbarOpen] = useState(false);

	const callAPI = () => {
		setIsError(false);
		setIsLoading(true);

		let params = new URL(document.location).searchParams;
		let date = params.get("date");

		axios({
			method: "GET",
			url: "/apod",
			params: {
				date: date,
				thumbs: true,
			},
		})
			.then((response) => {
				setIsLoading(false);
				setDateData(response.data);
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
			storage.push(dateData);
		} else {
			let newStorage = storage.filter((entry) => entry.date !== dateData.date);
			storage = newStorage;
		}

		localStorage.setItem("nasa-apod_storage", JSON.stringify(storage));
	};

	const handleShareClick = (url) => {
		navigator.clipboard.writeText(`${window.location}`);
		setSnackbarOpen(true);
	};

	const handleSnackbarClose = (reason) => {
		if (reason === "clickaway") {
			return;
		}

		setSnackbarOpen(false);
	};

	const action = (
		<React.Fragment>
			<IconButton size="small" aria-label="close" color="inherit" onClick={handleSnackbarClose}>
				<CloseIcon fontSize="small" />
			</IconButton>
		</React.Fragment>
	);

	useEffect(() => {
		setIsLoading(true);

		let storage = [];

		if (localStorage.getItem("nasa-apod_storage") !== null) {
			storage = JSON.parse(localStorage.getItem("nasa-apod_storage"));

			if (storage.some((entry) => entry.date === dateData.date)) {
				setLike(true);
			}
		}

		callAPI();
	}, []);

	return (
		<div>
			{isLoading ? (
				<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
					<CircularProgress />
				</Backdrop>
			) : isError ? (
				<h3 className="loading_error">{errorMessage}</h3>
			) : (
				<article className="date-post_container">
					{dateData.media_type === "video" ? (
						<div className="media-container">
							<iframe
								width="100%"
								height="315"
								src={dateData.url}
								title="YouTube video player"
								frameBorder="0"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
							></iframe>
						</div>
					) : (
						<div className="media-container">
							<img src={dateData.url} alt={`${dateData.title}.`}></img>
							{dateData.copyright !== undefined ? <h5>Copyright: {dateData.copyright}</h5> : null}
						</div>
					)}
					<div className="date-post_content">
						<span>{dateData.date}</span>
						<h1>{dateData.title}</h1>
						{like ? (
							<FavoriteIcon className="icon_like_fill" onClick={() => handleLikeClick(false)} />
						) : (
							<FavoriteBorderIcon className="icon_like" onClick={() => handleLikeClick(true)} />
						)}
						<SendIcon className="icon" onClick={() => handleShareClick(dateData.url)} />
						<p>{dateData.explanation}</p>
					</div>
				</article>
			)}
			<Snackbar
				anchorOrigin={{
					vertical: "bottom",
					horizontal: "center",
				}}
				open={snackbarOpen}
				autoHideDuration={4000}
				onClose={handleSnackbarClose}
				message={"Copied post link"}
				action={action}
			/>
		</div>
	);
};

export default Date;
