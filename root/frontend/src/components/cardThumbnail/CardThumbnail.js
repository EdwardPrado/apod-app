import React from "react";
import "./cardThumbnail.scss";

import { Link } from "react-router-dom";

const CardThumbnail = (props) => {
	return (
		<Link to={{ pathname: "/post", search: `?date=${props.date}` }}>
			<div className="card-thumbnail_wrapper">
				{props.media_type === "video" ? (
					<img src={props.thumbnail_url} alt={`${props.title}.`} />
				) : (
					<img src={props.media_url} alt={`${props.title}.`} />
				)}
				<article>
					<span>{props.date}</span>
					<h3>{props.title}</h3>
				</article>
			</div>
		</Link>
	);
};

export default CardThumbnail;
