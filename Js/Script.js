const allPhone = () => {
  const searchInput = document.getElementById("search-input").value;
  searchInput.value = "";

  const url = `https://openapi.programming-hero.com/api/phones?s=${searchInput}`;
  fetch(url)
    .then((res) => res.json())
    .then((datas) => displayPhone(datas.data));
};

const displayPhone = (phones) => {
  const searchResults = document.getElementById("search-results");

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
         </div>
      </div>`;
    searchResults.appendChild(div);
  }
};
