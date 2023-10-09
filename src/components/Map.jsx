import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import {
  Marker,
  Popup,
  MapContainer,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCity } from "../contexts/CityProvider";
import { useGeolocation } from "../Hooks/UseGeoLocation";
import Button from "./Button";
import Spinner from "./Spinner";
import { useGetPosition } from "../Hooks/useGetPosition";

function Map() {
  const navigate = useNavigate();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCity();
  const { isLoading, getPosition, position } = useGeolocation();

  // Using useSearchParms Hook
  // This will return an object that we can call get mothod on that
  // const [searchParms, setSearchParams] = useSearchParams();
  // const la = searchParms.get("lat");
  // const ln = searchParms.get("lng");
  const [lat, lng] = useGetPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([lat, lng]);
    },
    [lat, lng]
  );
  useEffect(
    function () {
      if (position) setMapPosition([position.lat, position.lng]);
    },
    [position]
  );
  return (
    <div className={styles.mapContainer}>
      {!position && (
        <Button type="position" onClick={getPosition}>
          {isLoading ? "Loadin..." : "Use your position"}
        </Button>
      )}
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
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <GetPosition position={mapPosition} />
        <ClickMap />
      </MapContainer>
    </div>
  );
}

export default Map;
function GetPosition({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function ClickMap() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
  return null;
}
// useMap and call setView()

// click on map
//useMapEvents({
//click: e=> navigat("form")
//})

// 1) get the location onclick on the map
