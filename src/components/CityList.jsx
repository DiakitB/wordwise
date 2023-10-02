import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCity } from "../contexts/CityProvider";
function CityList() {
  const { cities, isLoading } = useCity();
  if (isLoading) return <Spinner />;
  if (cities.length < 0)
    return <Message message="Click on the map to add your first city" />;
  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
