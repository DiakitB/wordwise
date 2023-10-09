// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import Message from "./Message";
import Button from "./Button";
import BackButton from "./BackButton";
import { useGetPosition } from "../Hooks/useGetPosition";
import Spinner from "./Spinner";
import ReactDatePicker from "react-datepicker";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}
const BAS_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";
function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [emoji, setEmoji] = useState("");
  // const navigate = useNavigate();
  const [la, ln] = useGetPosition();

  if (!la && ln) return <Message message="Click on the map silly" />;
  useEffect(
    function () {
      if (!la && !ln) return;
      async function getLocation() {
        try {
          setIsLoading(true);
          setError("");
          const res = await fetch(`${BAS_URL}?latitude=${la}&longitude=${ln}`);
          const data = await res.json();
          console.log(data);
          if (!data.countryCode)
            throw new Error(
              "Sorry, that seems not to be a city please click on a city"
            );

          if (data.countryCode) setCityName(data.city || data.locality || "");

          setCountry(data.countryName);
          setEmoji(convertToEmoji(data.countryCode));
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      }
      getLocation();
    },
    [la, ln]
  );

  ////
  if (isLoading) return <Spinner />;
  if (error) return <Message message={error} />;
  if (!la && !ln) return <Message message="Click on a city on the map" />;

  /////

  ///

  // "cityName": "Lisbon",
  //     "country": "Portugal",
  //     "emoji": "🇵🇹",
  //     "date": "2027-10-31T15:59:59.138Z",
  //     "notes": "My favorite city so far!",
  //     "position": {
  //       "lat": 38.727881642324164,
  //       "lng": -9.140900099907554
  //     },
  ////
  function onSubmitHandler(e) {
    e.preventDefault();
    if (!cityName) return;
    const newCity = {
      cityName,
      country,
      emoji,
      notes,
      position: { la, ln },
    };
    console.log(newCity);
  }
  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        {/* <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        /> */}
        {
          <ReactDatePicker
            id="date"
            onChange={(date) => setDate(date)}
            selected={date}
            dateFormat="ddd/MMM/yyy"
          />
        }
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
