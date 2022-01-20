import React, { useState } from "react";
import "./search.scss";

import ThumbnailGrid from "../../components/ThumbnailGrid/ThumbnailGrid";

import axios from "axios";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { styled } from "@mui/material/styles";

import CircularProgress from "@mui/material/CircularProgress";
import Backdrop from "@mui/material/Backdrop";

const Search = () => {
	const [searchOption, setSearchOption] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const [cards, setCards] = useState([]);

	const StyledFormControl = styled(FormControl)({
		"& .MuiSvgIcon-root": {
			color: "var(--font)",
		},
		"& .MuiInputBase-root": {
			color: "var(--font)",
		},
		"& label": {
			color: "var(--font)",
		},
		"& label.Mui-focused": {
			color: "var(--font)",
		},
		"& .MuiInput-underline:after": {
			borderBottomColor: "var(--font)",
		},
		"& .MuiOutlinedInput-root": {
			"& fieldset": {
				borderColor: "var(--font)",
			},
			"&:hover fieldset": {
				borderColor: "var(--font)",
			},
			"&.Mui-focused fieldset": {
				borderColor: "var(--font)",
			},
		},
	});

	const handleChange = (event) => {
		setIsLoading(true);
		setSearchOption(event.target.value);
		getAPOD(event.target.value);
	};

	const getAPOD = (dateSelection) => {
		let datePeriod = {};
		let start_date;
		let end_date;

		switch (dateSelection) {
			case "week":
				start_date = new Date();
				end_date = new Date();
				start_date.setDate(end_date.getDate() - 7);

				datePeriod = {
					start_date: start_date.toISOString().split("T")[0],
					end_date: end_date.toISOString().split("T")[0],
				};
				break;
			case "month":
				start_date = new Date();
				end_date = new Date();
				start_date.setDate(end_date.getDate() - 30);

				datePeriod = {
					start_date: start_date.toISOString().split("T")[0],
					end_date: end_date.toISOString().split("T")[0],
				};
				break;
			case "year":
				start_date = new Date();
				end_date = new Date();
				start_date.setDate(end_date.getDate() - 365);

				datePeriod = {
					start_date: start_date.toISOString().split("T")[0],
					end_date: end_date.toISOString().split("T")[0],
				};
				break;
			default:
				break;
		}

		axios({
			method: "GET",
			url: "/apod",
			params: {
				...datePeriod,
				thumbs: true,
			},
		})
			.then((response) => {
				let cardArr = [];

				//Reverse the array so it's in chronological order
				let data = Array.isArray(response.data) ? response.data.reverse() : response.data;

				Array.isArray(data) ? cardArr.push(...data) : cardArr.push(data);

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

	return (
		<div className="card-thumbnail_container">
			{isLoading ? (
				<Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
					<CircularProgress />
				</Backdrop>
			) : null}

			<Box sx={{ minWidth: 120, maxWidth: 200, margin: "3rem auto 0 auto" }}>
				<StyledFormControl
					fullWidth
					InputLabelProps={{
						style: { color: "red" },
					}}
				>
					<InputLabel id="simple-select-label">Search By</InputLabel>
					<Select
						labelId="simple-select-label"
						id="simple-select"
						value={searchOption}
						label="Search By"
						onChange={handleChange}
					>
						<MenuItem value={"day"}>Past 24 hours</MenuItem>
						<MenuItem value={"week"}>Past week</MenuItem>
						<MenuItem value={"month"}>Past month</MenuItem>
						<MenuItem value={"year"}>Past year</MenuItem>
					</Select>
				</StyledFormControl>
			</Box>

			{isError ? <h3 className="loading_error">{errorMessage}</h3> : null}

			<ThumbnailGrid cards={cards} />
		</div>
	);
};

export default Search;
