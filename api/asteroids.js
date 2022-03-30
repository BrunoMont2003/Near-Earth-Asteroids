import fetch from "node-fetch";

const API_KEY = "XEBPgDPAePP97QjDkGIgDWRZIcKf1rBjnDKVihXj";

export const getAsteroids = async (start_date, end_date) => {
  const URI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;

  const response = await fetch(URI);
  const { near_earth_objects } = await response.json();
  console.log(near_earth_objects);
};
