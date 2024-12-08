import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCountries } from "../context/CountryContext";

const Home = () => {
  const { countries } = useCountries();
  const [filterByRegion, setFilterByRegion] = useState("");
  const [sortBy, setSortBy] = useState("");

  const regions = [...new Set(countries.map((country) => country.region))];

  const handleSortAndFilter = () => {
    let updatedCountries = [...countries];

    // Filter by region
    if (filterByRegion) {
      updatedCountries = updatedCountries.filter(
        (country) => country.region === filterByRegion
      );
    }

    // Sort by population
    if (sortBy === "population") {
      updatedCountries.sort((a, b) => a.population - b.population);
    }

    return updatedCountries;
  };

  const displayedCountries = handleSortAndFilter();

  return (
    <div className="home">
      <div className="controls">
        <select
          onChange={(e) => setFilterByRegion(e.target.value)}
          value={filterByRegion}
        >
          <option value="">Filter by Region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
        <button
          onClick={() =>
            setSortBy((prev) => (prev === "population" ? "" : "population"))
          }
        >
          {sortBy === "population" ? "Clear Sort" : "Sort by Population"}
        </button>
      </div>
      <div className="grid">
        {displayedCountries.map((country) => (
          <div key={country.name.common} className="card">
            <img src={country.flags.svg} alt={country.name.common} />
            <h2>{country.name.common}</h2>
            <p>Population: {country.population.toLocaleString()}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital || "N/A"}</p>
            <Link to={`/${country.name.common}`}>
              <button>More Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
