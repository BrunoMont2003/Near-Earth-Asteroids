import { getAsteroids } from "./api/asteroids.js";

const date_start = document.getElementsByName("start")[0];
const date_end = document.getElementsByName("end")[0];
const form = document.getElementById("form");
const asteroids_container = document.getElementById("asteroids_container");

const chooseHazardous = (is_hazardous) => {
  let text = "";
  if (is_hazardous) {
    text = `
      <span class="text-red-500 block">
            <i class="fa-solid fa-circle-exclamation"></i>
            Is a hazardous asteroid
          </span>
          
          `;
  } else {
    text = `
      <span class="text-green-500 block">
            <i class="fa-solid fa-shield"></i>
            Is not a hazardous asteroid
          </span>
      
      `;
  }
  return text;
};
const chooseSentry = (is_sentry) => {
  let text = "";
  if (is_sentry) {
    text = `
    <span class="text-neutral-300 block">
    <i class="fa-solid fa-code-commit"></i>
    Is a sentry object
  </span>
  
          
          `;
  } else {
    text = `
    <span class="text-neutral-300 block">
    <i class="fa-solid fa-code-merge"></i>
    Is not a sentry object
  </span>    
      `;
  }
  return text;
};

const showAsteroids = (asteroids) => {
  asteroids_container.innerHTML = "";
  asteroids_container.innerHTML = `
  
  <div class="col-span-full flex flex-col items-center justify-center">
  
  <h4 class="text-yellow-200 text-2xl">
  
  ${asteroids.length} asteroids found
  
  </h4>
  <h6 class="text-white">Between ${formatDateClient(
    date_start.value
  )} and ${formatDateClient(date_end.value)}</h6>
  </div>
  `;
  asteroids.map(
    ({
      id,
      name,
      absolute_magnitude_h,
      estimated_diameter,
      is_potentially_hazardous_asteroid,
      close_approach_date,
      relative_velocity,
      miss_distance,
      is_sentry_object,
    }) => {
      asteroids_container.innerHTML += `
      <div class="p-5 rounded text-white border-2 w-80 border-yellow-200">
      <h4 class="text-center font-bold text-lg text-purple-300">
        <i class="fa-solid fa-meteor"></i>
        ${name}
      </h4>
      <h6 class="text-center text-xs my-2 text-amber-400">#${id}</h6>
      <ul class="">
        <li>
          <i class="fa-solid fa-binoculars text-blue-400"></i>
          <span class="text-lime-400"> Absolute Magnitude (h): </span>
          <span class="text-rose-400"> ${absolute_magnitude_h} </span>
        </li>
        <li>
          <i class="fa-solid fa-circle-notch text-blue-400"></i>
          <span class="text-lime-400"> Estimated Diameter (km): </span>
          <span class="text-rose-400"> ${estimated_diameter} </span>
        </li>
        <li>
          <i class="fa-solid fa-calendar-day text-blue-400"></i>
          <span class="text-lime-400"> Close Approach Date: </span>
          <span class="text-rose-400"> ${close_approach_date} </span>
        </li>
        <li>
          <i class="fa-solid fa-bolt text-blue-400"></i>
          <span class="text-lime-400"> Relative Velocity (kps): </span>
          <span class="text-rose-400"> ${relative_velocity} </span>
        </li>
        <li>
          <i class="fa-solid fa-arrows-to-dot text-blue-400"></i>
          <span class="text-lime-400"> Miss Distance (km): </span>
          <span class="text-rose-400"> ${miss_distance} </span>
        </li>
        <li>
          ${chooseHazardous(is_potentially_hazardous_asteroid)}
        </li>
        <li>
          ${chooseSentry(is_sentry_object)}
        </li>
      </ul>
    </div>
        
        `;
    }
  );
};

const formatDate = (date) => {
  let date_ = new Date(date);
  return moment(date_).format("YYYY-MM-DD");
};
const formatDateClient = (date) => {
  let date_ = new Date(date);
  return moment(date_).format("LL");
};

const getDistance = (date_start, date_end) => {
  let start = new Date(date_start);
  let end = new Date(date_end);
  return moment(end).diff(moment(start), "days");
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  let difference = getDistance(date_start.value, date_end.value);
  if (difference > 7) {
    Swal.fire({
      title: "Error!",
      text: "7 days maximum of difference ",
      icon: "error",
      confirmButtonText: "Cool",
    });
  } else if (difference < 0) {
    Swal.fire({
      title: "Error!",
      text: "Enter a valid range",
      icon: "error",
      confirmButtonText: "Cool",
    });
  } else {
    asteroids_container.innerHTML =
      "<span class='text-white'>Cargando ...</span>";
    let start = formatDate(date_start.value);
    let end = formatDate(date_end.value);
    let asteroids = await getAsteroids(start, end);
    showAsteroids(asteroids);
  }
});

asteroids_container.innerHTML = "<span class='text-white'>Cargando ...</span>";
const asteroids = await getAsteroids(
  formatDate(date_start.value),
  formatDate(date_end.value)
);
showAsteroids(asteroids);
