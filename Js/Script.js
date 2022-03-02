// Search Button Input
const allPhones = () => {
  const searchInput = document.getElementById("search-input").value;
  searchInput.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhone(datas.data));
};
// Display Phone Part
const displayPhone = (phones) => {
  const searchInput = document.getElementById("search-input");
  searchInput.value = "";
  const limitPhone = phones.slice(0, 20);
  const searchResults = document.getElementById("search-results");
  const ErrorHandling = document.getElementById("Error-Handling");
  searchResults.textContent = "";
  if (phones.length == 0) {
    ErrorHandling.innerText = "No Phone Found!!!";
  }

  for (let phone of limitPhone) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100 border-info shadow mt-3">
      <img src="${phone.image}" class="card-img-top w-25 mt-3 mx-auto" alt="..." />
         <div class="card-body">
          <h5 class="card-title text-center">${phone.phone_name}</h5>
          <h6 class="card-text text-center">
          ${phone.brand}
          </h6>
          <button
          onclick="PhoneDetails('${phone.slug}')"
          class="btn btn-outline-info rounded-3 fw-bold"
          type="button"
          id="search-button">
          Explore More
         </button>
         </div>
      </div>`;
    searchResults.appendChild(div);
  }
};

// Display Phone Details Part
const PhoneDetails = (phoneDetails) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneDetails}`;

  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhoneDetail(datas.data));
};

const displayPhoneDetail = (mobile) => {
  const displayPhoneDetailS = document.getElementById("phone-details");

  displayPhoneDetailS.innerHTML = `
  <img class='w-50 mx-auto mt-3 mb-3' src='${mobile.image}'/>

  <h2>${mobile.name}</h2>

  <p class="fw-bolder">Realese Date: ${
    mobile.releaseDate ? mobile.releaseDate : "No Realese Date Found"
  }</p>

  <h3 class='fw-bolder'>Main Features</h3>
  <p><span class="fw-bolder">Chipset:</span> ${mobile.mainFeatures.chipSet}</p>
  <p><span class="fw-bolder">Display Size:</span> ${
    mobile.mainFeatures.displaySize
  }</p>

  <p><span class="fw-bolder">Storage:</span> ${mobile.mainFeatures.storage}</p>

  <p><span class="fw-bolder">Memory:</span> ${mobile.mainFeatures.memory}</p>

  <h3 class='fw-bolder mt-2 mb-3'>Sensor Details</h3>

  <div id='sensorDiv'><span class="fw-bolder">Sensors:</span> </div>
  
  <div id='otherDiv'><h3 class='fw-bolder mt-3 mb-3'>Others Details</h3></div>
  `;

  sensorAndOtherData(mobile.slug);
};

// Display Sensor Part
const sensorAndOtherData = (slug) => {
  console.log(slug);
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => sensorAndOtherDisplay(data.data));
};
const sensorAndOtherDisplay = (sensor) => {
  const sensorData = sensor.mainFeatures.sensors;
  const sensorDiv = document.getElementById("sensorDiv");
  sensorData.forEach((y) => {
    const span = document.createElement("span");
    span.innerText = `${y} `;
    sensorDiv.appendChild(span);
  });

  // Display Others part
  const othersData = Object.entries(sensor.others);
  console.log(othersData);
  const othersDiv = document.getElementById("otherDiv");
  if (othersData) {
    othersData.forEach(([key, value]) => {
      console.log(key, value);
      const p = document.createElement("p");
      p.innerText = `${key} : ${value}`;
      othersDiv.appendChild(p);
    });
  } else {
    othersDiv.innerHTML = `<p>"This Phone Has No Other Data!!</p>`;
  }
};
