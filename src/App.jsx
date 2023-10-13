import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Product from "./pages/Product";

import HomePage from "./pages/HomePage";
import PageNotFund from "./pages/PageNotFund";
import AppLayout from "./pages/AppLayout";
import "./index.css";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import CityList from "./components/CityList";
import { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CityProvider } from "./contexts/CityProvider";
import { AuthProvider } from "./contexts/AuthProvider";

function App() {
  return (
    <CityProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="product" element={<Product />} />
          <Route path="price" element={<Pricing />} />
          <Route path="login" element={<Login />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate to="cities" />} />
            <Route path="cities" element={<CityList />} />
            <Route path="cities/:id" element={<City />} />
            <Route path="countries" element={<CountryList />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFund />} />
        </Routes>
      </BrowserRouter>
    </CityProvider>
  );
}

export default App;
