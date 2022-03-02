const allPhones = () => {
  const searchInput = document.getElementById("search-input").value;
  searchInput.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?search=${searchInput}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhone(datas.data));
};

const displayPhone = (phones) => {
  const searchResults = document.getElementById("search-results");
  const ErrorHandling = document.getElementById("Error-Handling");
  searchResults.textContent = "";
  if (phones.length == 0) {
    ErrorHandling.innerText = "No Phone Found!!!";
  }

  for (let phone of phones) {
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

const PhoneDetails = (phoneDetails) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneDetails}`;

  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhoneDetail(datas.data));
};

const displayPhoneDetail = (mobile) => {
  const displayPhoneDetailS = document.getElementById("phone-details");
  // const sliceData = mobile.slice(0, 20);

  console.log(mobile);
  console.log(mobile.brand);
  console.log(mobile.image);

  // const div = document.createElement("div");
  // div.classList.add("cards");
  displayPhoneDetailS.innerHTML = `
  <img class='w-50 mx-auto mt-3 mb-3' src='${mobile.image}'/>
  <h2>${mobile.name}</h2>

  <p class="fw-bolder">Realese Date: ${
    mobile.releaseDate ? mobile.releaseDate : "No Realese Date Found"
  }</p>
  <h3 class='fw-bolder'>Main Features</h3>
  <p>Chipset: ${mobile.mainFeatures.chipSet}</p>
  <p>Display: ${mobile.mainFeatures.displaySize}</p>
  <p>Memory: ${mobile.mainFeatures.memory}</p>
  <h3 class='fw-bolder mt-2 mb-3'>Sensor Details</h3>
  <div id='sensorDiv'>Sensors: </div>
  <h3 class='fw-bolder mt-3 mb-3'>Others Details</h3>
  <div id='otherDiv'>Others: </div>
  
 
  `;
  sensorAndOtherData(mobile.slug);

  // displayPhoneDetailS.appendChild(div);
};
const sensorAndOtherData = (slug) => {
  console.log(slug);
  const url = `https://openapi.programming-hero.com/api/phone/${slug}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => sensorAndOtherDisplay(data.data));
};
const sensorAndOtherDisplay = (sensor) => {
  // console.log(sensor);
  const sensorData = sensor.mainFeatures.sensors;
  const sensorDiv = document.getElementById("sensorDiv");
  sensorData.forEach((y) => {
    // const sensorDiv = document.getElementById("sensor-detail");
    const span = document.createElement("span");
    span.innerText = `${y} `;
    sensorDiv.appendChild(span);
  });
  // console.log(sensor.others);

  const othersData = Object.entries(sensor.others);
  console.log(othersData);

  othersData.forEach(([key, value]) => {
    const othersDiv = document.getElementById("otherDiv");
    console.log(key, value);
    othersDiv.innerText = `${key} : ${value}`;
  });
};

{
  /* <h3 class='fw-bolder'>Others</h3>
  <p>Bluetooth: ${mobile.others.Bluetooth}</p>
  <p>GPS: ${mobile.others.GPS}</p>
  <p>NFC: ${mobile.others.NFC}</p>
  <p>Radio: ${mobile.others.Radio}</p>
  <p>USB: ${mobile.others.USB}</p>
  <p>WLAN: ${mobile.others.WLAN}</p> */
}
