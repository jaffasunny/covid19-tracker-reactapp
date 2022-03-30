import React from "react";
import "./Map.css";
import ChangeView from "./ChangeView";
import { MapContainer as MapLeaflet, TileLayer } from "react-leaflet";
import { showDataOnMap } from "./util";

const Map = ({ countries, casesType, center, zoom }) => {
	return (
		<div className="map">
			{console.log(center, zoom)}
			<MapLeaflet center={center} zoom={zoom}>
				{/* ChangeView Component re renders the axis of the map */}
				<ChangeView center={center} zoom={zoom} />

				<TileLayer
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
				/>

				{showDataOnMap(countries, casesType)}
			</MapLeaflet>
		</div>
	);
};

export default Map;
