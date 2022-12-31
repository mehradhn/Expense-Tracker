import { MapContainer, TileLayer } from "react-leaflet";
import { MdLocationOn } from "react-icons/md";
import React, { useRef } from "react";
import "./Map.css";
const Map = (props) => {
  console.log(props);
  const mapRef = useRef();
  console.log(mapRef.current);
  const position = [35.73, 51.4937];
  return (
    <div>
      <MapContainer
        ref={mapRef}
        className="map-container"
        center={position}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MdLocationOn className="icon-map" />
      </MapContainer>
      <button onClick={() => console.log(mapRef.current.getCenter())} >
        click me
      </button>
    </div>
  );
};

export default Map;
