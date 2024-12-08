import React from "react";
import { useParams } from "react-router-dom";
import { useCountries } from "../context/CountryContext";

const CountryDetails = () => {
  const { country } = useParams();
  const { countries } = useCountries();

  const selectedCountry = countries.find((c) => c.name.common === country);

  if (!selectedCountry) return <p>Loading...</p>;

  return (
    <div className="details">
      <h1>{selectedCountry.name.common}</h1>
      <p>Native Name: {Object.values(selectedCountry.name.nativeName)[0]?.common || "N/A"}</p>
      <p>Sub Region: {selectedCountry.subregion}</p>
      <p>Currency: {Object.values(selectedCountry.currencies || {})[0]?.name || "N/A"}</p>
      <p>Languages: {Object.values(selectedCountry.languages || {}).join(", ") || "N/A"}</p>
      <p>Border Countries: {selectedCountry.borders?.join(", ") || "None"}</p>
    </div>
  );
};

export default CountryDetails;
