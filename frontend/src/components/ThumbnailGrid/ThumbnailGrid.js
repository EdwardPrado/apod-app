import React from "react";
import "./thumbnailGrid.scss";

import CardThumbnail from "../cardThumbnail/CardThumbnail";

const ThumbnailGrid = (props) => {
	return (
		<div className="card-thumbnail_grid">
			{props.cards.map((card) => (
				<CardThumbnail key={card.date} {...card} />
			))}
		</div>
	);
};

export default ThumbnailGrid;
