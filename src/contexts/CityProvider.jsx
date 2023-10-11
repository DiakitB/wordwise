import { useReducer } from "react";
import { createContext, useContext, useEffect, useState } from "react";

const CityContext = createContext();
const URL = "http://localhost:800";
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, isLoading: false, cities: action.paylaod };
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.paylaod };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.paylaod],
        currentCity: action.paylaod,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.paylaod),
        currentCity: {},
      };
    case "rejected":
      return { ...state, isLoading: false, error: action.paylaod };
  }
}
function CityProvider({ children }) {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );
  useEffect(function () {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${URL}/cities`);
        const data = await res.json();

        dispatch({ type: "cities/loaded", paylaod: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          paylaod: "There was a error loading data...",
        });
      }
    }
    fetchCities();
  }, []);
  async function getCity(id) {
    if (Number(id) === currentCity.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities/${id}`);
      const data = await res.json();
      console.log(data);
      dispatch({ type: "city/loaded", paylaod: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        paylaod: "There was a error loading data...",
      });
    }
  }

  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", paylaod: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        paylaod: "There was a error loading data...",
      });
    }
  }
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${URL}/cities/${id}`, {
        method: "DELETE",
      });

      // setCities((cities) => cities.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", paylaod: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        paylaod: "There was a error loading data...",
      });
    }
  }
  return (
    <CityContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CityContext.Provider>
  );
}

function useCity() {
  const context = useContext(CityContext);
  return context;
}

export { CityProvider, useCity };
