//timezone mapping
export const COUNTRY_TIMEZONE_MAP = {
  Afghanistan: "Asia/Kabul",
  Albania: "Europe/Tirane",
  Algeria: "Africa/Algiers",
  "Åland Islands": "Europe/Mariehamn",
};

export function getOrdinalSuffix(day) {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function getCountryTime(country) {
  let timeStr = "N/A";
  const now = new Date();
  const countryName = country?.name?.common;
  function formatDateWithOrdinal(dateObj) {
    const day = dateObj.getDate();
    const suffix = getOrdinalSuffix(day);
    const month = dateObj.toLocaleString("en-GB", { month: "short" });
    const year = dateObj.getFullYear();
    const hour = dateObj.getHours().toString().padStart(2, "0");
    const minute = dateObj.getMinutes().toString().padStart(2, "0");
    return `${day}${suffix} ${month} ${year}, ${hour}:${minute}`;
  }

  const iana = COUNTRY_TIMEZONE_MAP[countryName];
  if (iana) {
    try {
      const dateIana = new Date(
        now.toLocaleString("en-US", { timeZone: iana })
      );
      timeStr = formatDateWithOrdinal(dateIana);
      return timeStr;
    } catch (e) {}
  }
  if (country.timezones && country.timezones.length > 0) {
    const offsetStr = country.timezones[0];
    const match = offsetStr.match(/UTC([+-]\d{1,2}):?(\d{2})?/);
    if (match) {
      const hours = parseInt(match[1], 10);
      const minutes = parseInt(match[2] || "0", 10);
      const offsetMs =
        (hours * 60 + (hours >= 0 ? minutes : -minutes)) * 60 * 1000;
      const utc = now.getTime() + now.getTimezoneOffset() * 60000;
      const localTime = new Date(utc + offsetMs);
      timeStr = formatDateWithOrdinal(localTime);
      return timeStr;
    }
  }
  return timeStr;
}
