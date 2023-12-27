// import { elementRoles } from "aria-query";
import config from "../conf/index.js";

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
  console.log(user)
   return user;
}catch(e) {
  return null;
}
}
// fetchCities();

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let cards = document.getElementById("data");

  let cardDiv = document.createElement("div");
  // cardDiv.id = id;
  cardDiv.className = "col-lg-3 col-md-3 col-sm-6 tile";

  let anchor = document.createElement("a");
  anchor.id = id;
  anchor.setAttribute("href", "pages/adventures/?city=" + id);

  let infoDiv = document.createElement("div");
  infoDiv.className = "tile-text text-center";

  let name = document.createElement("h5");
  name.textContent = city;

  let desc = document.createElement("p");
  desc.textContent = description;

  infoDiv.append(name, desc);

  let cityImage = document.createElement("img");
  cityImage.src = image;
  cityImage.className = "card-img";

  anchor.append(cityImage);
  cardDiv.append(anchor, infoDiv);

  cards.append(cardDiv);
}

export { init, fetchCities, addCityToDOM };
