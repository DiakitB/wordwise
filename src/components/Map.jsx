import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  // Using useSearchParms Hook
  // This will return an object that we can call get mothod on that
  const [searchParms, setSearchParams] = useSearchParams();
  const la = searchParms.get("lat");
  const ln = searchParms.get("lng");
  console.log(la, ln);
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Position:{la} {ln}
      </h1>
    </div>
  );
}

export default Map;
