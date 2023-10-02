import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { Marker, Popup, MapContainer, TileLayer } from "react-leaflet";
import { useState } from "react";
import { useCity } from "../contexts/CityProvider";

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCity();
  console.log(cities);
  // Using useSearchParms Hook
  // This will return an object that we can call get mothod on that
  // const [searchParms, setSearchParams] = useSearchParams();
  // const la = searchParms.get("lat");
  // const ln = searchParms.get("lng");
  // console.log(la, ln);
  return (
    <div className={styles.mapContainer}>
      <MapContainer
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {
          <Marker position={mapPosition}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        }
      </MapContainer>
    </div>
  );
}

export default Map;
