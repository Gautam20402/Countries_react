import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [neighbors, setNeighbors] = useState([]);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${code}`)
      .then((res) => res.json())
      .then((data) => {
        setCountry(data[0]);
        if (data[0]?.borders?.length) {
          Promise.all(
            data[0].borders.map((code) =>
              fetch(`https://restcountries.com/v3.1/alpha/${code}`).then((r) =>
                r.json()
              )
            )
          ).then((neighData) => setNeighbors(neighData.map((n) => n[0])));
        }
      });
  }, [code]);

  if (!country) return null;
  return (
    <div className="country-detail-page">
      <h1>{country.name.common}</h1>
      <div className="flag-info-row">
        <img src={country.flags.svg} alt="Country Flag" id="countryFlag" />
        <div className="info" id="countryInfo">
          <p>
            Native Name:{" "}
            {country.name?.nativeName
              ? Object.values(country.name.nativeName)[0].common
              : country.name.common}
          </p>
          <p>Capital: {country.capital?.[0] || "N/A"}</p>
          <p>Population: {country.population || "N/A"}</p>
          <p>Region: {country.region || "N/A"}</p>
          <p>Sub-region: {country.subregion || "N/A"}</p>
          <p>Area: {country.area ? `${country.area} Km²` : "N/A"}</p>
          <p>
            Country Code:{" "}
            {country.idd?.root
              ? country.idd.root +
                (country.idd.suffixes ? country.idd.suffixes[0] : "")
              : "N/A"}
          </p>
          <p>
            Languages:{" "}
            {country.languages
              ? Object.values(country.languages).join(" and ")
              : "N/A"}
          </p>
          <p>
            Currencies:{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => c.name)
                  .join(", ")
              : "N/A"}
          </p>
          <p>
            Timezones:{" "}
            {country.timezones ? country.timezones.join(", ") : "N/A"}
          </p>
        </div>
      </div>
      <div className="neighbors-block">
        <h2>Neighbour Countries</h2>
        <div className="flag-grid" id="neighbors">
          {neighbors.length
            ? neighbors.map((n) => (
                <img key={n.cca3} src={n.flags.svg} alt={n.name.common} />
              ))
            : "No neighboring countries."}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
