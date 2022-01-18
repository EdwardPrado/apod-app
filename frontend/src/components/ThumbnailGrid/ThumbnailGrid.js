import React, { useState } from "react";
import "./thumbnailGrid.scss";

import CardThumbnail from "../../components/cardThumbnail/CardThumbnail";

import { VariableSizeGrid } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { useMediaQuery } from "@mui/material";

const ThumbnailGrid = (props) => {
	const [cellSize, setCellSize] = useState(340);
	const [columnCount, setColumnCount] = useState(3);

	const xlg = useMediaQuery("(max-width: 1200px");
	const lg = useMediaQuery("(min-width: 1024px");
	const md = useMediaQuery("(min-width: 750px");

	const gridRef = React.createRef();
	const onResize = (...args) => {
		if (gridRef.current != null) {
			gridRef.current.resetAfterColumnIndex(1);

			if (xlg) {
				setColumnCount(2);
			} else {
				setColumnCount(3);
			}

			if (lg) {
				setCellSize(200);
			} else {
				setCellSize(340);
			}

			if (md) {
				setCellSize(150);
			} else {
				setCellSize(200);
			}
		}
	};

	const getCardThumbnail = (index) => {
		if (props.dimensionalCardArray[index]) {
			return <CardThumbnail {...props.dimensionalCardArray[index]} />;
		}
	};

	function getRowCount(cardArray, columns) {
		let rowCount = cardArray / columns;

		if (rowCount % 1 === 0) {
			return rowCount;
		} else {
			return Math.ceil(rowCount);
		}
	}

	return (
		<AutoSizer onResize={onResize} disableHeight>
			{({ height, width }) => (
				<VariableSizeGrid
					ref={gridRef}
					className="card-thumbnail_grid"
					rowCount={getRowCount(props.dimensionalCardArray.length, columnCount)}
					rowHeight={() => cellSize}
					height={props.height}
					width={cellSize * 3}
					columnCount={columnCount}
					columnWidth={() => cellSize}
					itemCount={props.cards.length}
					scrollToAlignment={"center"}
					style={{ display: "flex", margin: "auto" }}
				>
					{({ columnIndex, rowIndex, style }) => (
						<div
							style={{ ...style, display: "flex", justifyContent: "center", alignItems: "center" }}
							className="grid-container"
						>
							{/* Ensures only CardThumbnails with a valid index passed are returned.
								This prevents undefined thumbnails filling the rest of a row if only
								part of it is used.*/}
							{getCardThumbnail(rowIndex * 3 + columnIndex)}
						</div>
					)}
				</VariableSizeGrid>
			)}
		</AutoSizer>
	);
};

export default ThumbnailGrid;
