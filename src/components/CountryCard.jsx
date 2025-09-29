import React from "react";
import { useNavigate } from "react-router-dom";
import { getCountryTime } from "../datetime";

function CountryCard({ country }) {
  const navigate = useNavigate();
  const dateTimeStr = getCountryTime(country);

  return (
    <div className="card">
      <img
        src={country.flags.svg}
        alt={`${country.name.common} Flag`}
        className="flag-img"
      />
      <div className="card-content">
        <h2 className="country-title">{country.name.common}</h2>
        <p className="country-currency">
          Currency:{" "}
          {Object.values(country.currencies || {})
            .map((cur) => cur.name)
            .join(", ") || "N/A"}
        </p>
        <p className="country-dt">Current date and time: {dateTimeStr}</p>
        <div className="btn-row">
          <button
            onClick={() => window.open(country.maps.googleMaps, "_blank")}
          >
            Show Map
          </button>
          <button onClick={() => navigate(`/detail/${country.cca3}`)}>
            Detail
          </button>
        </div>
      </div>
    </div>
  );
}
export default CountryCard;
