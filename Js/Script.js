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
  console.log(phones);

  for (let phone of phones) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `<div class="card h-100 border-info shadow mt-3">
      <img src="${phone.image}" class="card-img-top w-25 mt-3        mx-auto" alt="..." />
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

const displayPhoneDetail = (details) => {
  console.log(details);
  const displayPhoneDetailS = document.getElementById("phone-details");
  for (let detail of details) {
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
    <div class="card h-100 border-info shadow mt-3">
        <img src="${detail.image}" class="card-img-top w-25 mt-3 mx-auto" alt="..." />
      <div class="card-body">
        <h5 class="card-title text-center">${detail.brand}</h5>
        <h6 class="card-text text-center">
        ${detail.mainFeatures}
        </h6>
      </div>
   </div>`;
    displayPhoneDetailS.appendChild(div);
  }
};
