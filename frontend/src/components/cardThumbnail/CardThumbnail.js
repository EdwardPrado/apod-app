import React from "react";
import "./cardThumbnail.scss";

import { Link } from "react-router-dom";

const CardThumbnail = (props) => {
	return (
		<div className="card-thumbnail_wrapper">
			<Link to={{ pathname: "/post", search: `?date=${props.date}` }}>
				{props.media_type === "video" ? (
					<img src={props.thumbnail_url} alt={`${props.title}.`} />
				) : (
					<img src={props.url} alt={`${props.title}.`} />
				)}
				<article>
					<span>{props.date}</span>
					<h3>{props.title}</h3>
				</article>
			</Link>
		</div>
	);
};

export default CardThumbnail;
