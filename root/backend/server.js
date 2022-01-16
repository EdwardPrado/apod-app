const { request } = require("express");
const express = require("express");
const app = express();
const axios = require("axios");

require("dotenv/config");

app.get("/apod", async (req, res) => {
	try {
		const response = await axios({
			method: "GET",
			url: "https://api.nasa.gov/planetary/apod",
			params: {
				api_key: process.env.API_KEY,
				...req.query,
			},
		});
		res.status(200).json(response.data);
	} catch (err) {
		res.status(500).json({ message: err });
	}
});

app.listen(5000);
