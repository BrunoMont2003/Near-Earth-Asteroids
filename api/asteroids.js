import fetch from "node-fetch";

const API_KEY = "XEBPgDPAePP97QjDkGIgDWRZIcKf1rBjnDKVihXj";

export const getAsteroids = async (start_date, end_date) => {
  const URI = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${end_date}&api_key=${API_KEY}`;
  let asteroids = [];
  const response = await fetch(URI);
  const { near_earth_objects } = await response.json();
  // console.log(near_earth_objects);
  for (const date in near_earth_objects) {
    let day = near_earth_objects[date];
    day.map(
      ({
        id,
        name,
        absolute_magnitude_h,
        estimated_diameter,
        is_potentially_hazardous_asteroid,
        close_approach_data,
        is_sentry_object,
      }) => {
        let diameter =
          (estimated_diameter.kilometers.estimated_diameter_min +
            estimated_diameter.kilometers.estimated_diameter_min) /
          2;
        let data = close_approach_data[0];
        let { close_approach_date, relative_velocity, miss_distance } = data;
        let asteroid = {
          id,
          name,
          absolute_magnitude_h,
          estimated_diameter: diameter,
          is_potentially_hazardous_asteroid,
          close_approach_date,
          relative_velocity: relative_velocity.kilometers_per_second,
          miss_distance: miss_distance.kilometers,
          is_sentry_object,
        };

        asteroids.push(asteroid);
      }
    );
  }
  return asteroids;
};
