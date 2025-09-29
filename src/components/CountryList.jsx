import React, { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
const ALL_API =
  "https://restcountries.com/v3.1/all?fields=name,flags,currencies,timezones,region,cca3,maps";

function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    fetch(ALL_API)
      .then((res) => res.json())
      .then(setCountries);
  }, []);

  return (
    <div className="container">
      <h1>Countries</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Search countries"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <button className="search-btn">
          <img
            src="/search_logo.png"
            alt="Search"
            style={{ width: 35, height: 35 }}
          />
        </button>
      </div>
      <div id="countryList">
        {countries
          .filter((c) =>
            c.name.common.toLowerCase().includes(filter.toLowerCase())
          )
          .sort((a, b) => a.name.common.localeCompare(b.name.common))
          .map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))}
      </div>
    </div>
  );
}

export default CountryList;
