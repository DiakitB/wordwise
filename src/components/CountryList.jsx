import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from "./CountryItem";
import { useCity } from "../contexts/CityProvider";

function CountryList() {
  const { cities, isLoading } = useCity();
  console.log(cities);
  if (isLoading) return <Spinner />;
  if (cities.length < 0)
    return <Message message="Click on the map to add your first city" />;
  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);
  // const countryList = [];
  console.log(countries);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountryList;
