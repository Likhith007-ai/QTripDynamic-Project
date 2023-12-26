// import { elementRoles } from "aria-query";
import config from "../conf/index";

async function init() {
  //Fetches list of all cities along with their images and description
  console.log(`API endpoint to fetch Cities data: ${config.backendEndpoint}/cities`);
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
  let response = await fetch(`${config.backendEndpoint}/cities`);
  let user = await response.json();
   return user;
}catch(e) {
  return null;
}
}
fetchCities();

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cityDetailsSection = document.getElementById("data");
  cityDetailsSection.classList.add("d-flex","flex-wrap","justify-content-center");//----------------
  
  let add = document.createElement("div");
  add.classList.add("col-12", "col-lg-3", "col-md-4","col-sm-6","tile","text-center","mx-0","my-4");

  let link = document.createElement("a");
  link.id = id;
  link.href ="pages/adventures/?city=" + id;
  

  let division = document.createElement("div");
  division.className = "tile-text";

  let img = document.createElement("img");
  img.classList.add("img-thumbnail");
  img.src = image;

  let title = document.createElement("h5");
  title.innerText = city;

  let destination = document.createElement("p");
  destination.innerText = description;

  link.appendChild(img);
  division.appendChild(title);
  division.appendChild(destination);
  link.appendChild(division);
  add.appendChild(link);
  cityDetailsSection.appendChild(add);
}

export { init, fetchCities, addCityToDOM };
