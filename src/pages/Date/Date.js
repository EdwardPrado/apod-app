import React, { useState, useEffect } from "react";
import "./date.scss";

import Navbar from "../../components/Navbar/Navbar";

import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Date = () => {
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [dateData, setDateData] = useState({});

	const callAPI = () => {
		setIsError(false);
		setIsLoading(true);

		let params = new URL(document.location).searchParams;
		let date = params.get("date");

		axios({
			method: "GET",
			url: "https://api.nasa.gov/planetary/apod",
			params: {
				api_key: "mLDDGsKxXZXy6pvJuGI7Adk5xHK1zczZ5vkRKIhj",
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

	useEffect(() => {
		setIsLoading(true);
		callAPI();
	}, []);

	return (
		<div>
			<Navbar />
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
						<p>{dateData.explanation}</p>
					</div>
				</article>
			)}
		</div>
	);
};

export default Date;
