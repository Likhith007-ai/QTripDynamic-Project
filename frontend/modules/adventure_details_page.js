import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let id = search.split("=")[1];


  // Place holder for functionality to work in the Stubs
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    const res = await fetch(`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`);
    const user = await res.json();
    return user;
  } catch (e) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // let element = document.getElementsByClassName("adventure-detail-card");
  let title = document.getElementById("adventure-name");
  title.innerHTML = adventure.name;
  let sub = document.getElementById("adventure-subtitle");
  sub.innerHTML = adventure.subtitle;
  let details = document.getElementById("adventure-content");
  details.innerHTML = adventure.content;
  let div = document.getElementById("photo-gallery");
  adventure.images.forEach(x => {

    let img = document.createElement("img");
    img.src = x;
    img.className = "activity-card-image";
    img.style.display = "none";
    div.appendChild(img);

  });
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  const num = document.querySelector(".carousel-indicators");
  const ele = document.querySelector(".carousel-inner");

  images.forEach((image, index) => {
    const indicator = document.createElement("li");
    indicator.setAttribute("data-target", "#carouselExampleIndicators");
    indicator.setAttribute("data-slide-to", index);
    indicator.className = index === 0 ? "active" : "";
    num.appendChild(indicator);

    const item = document.createElement("div");
    item.className = `carousel-item ${index === 0 ? "active" : ""}`;

    const img = document.createElement("img");
    img.src = image;
    img.classList.add("d-block", "w-100");

    item.appendChild(img);
    ele.appendChild(item);
  });
}




//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure['available'] == true) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead

  } else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = adventure.costPerHead * persons;
}

//Implementation of reservation form submission using JQuery
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using JQuery to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById("myForm");
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log(form.elements["date"].value);

    const data = {
      name: form.elements["name"].value,
      date: new Date(form.elements["date"].value),
      person: form.elements["person"].value,
      adventure: adventure["id"]
    };

    console.log(data);

    try {
      const url = `${config.backendEndpoint}/reservations/new`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      // if (response.ok) {
        alert("Success");
        window.location.reload();
      // } else {
      //   alert("Failed!");
      // }
    } catch (error) {
      console.error(error);
      alert("failed");
    }
  });
}

// Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved === true) {
    document.getElementById("reserved-banner").style.display = "block";
  } else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};