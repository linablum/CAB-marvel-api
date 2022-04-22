let url =
  "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100";

async function loadChar() {
  const res = await fetch(url);
  const marvelCharacter = await res.json();
  showCard(marvelCharacter);
  console.log(marvelCharacter);
}

loadChar();

function showCard(data) {
  let divContainer = document.getElementById("container");
  for (i = 0; i < 10; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card", "bg-transparent", "mb-3");
    divCard.setAttribute("style", "max-width: 540px;");
    let divRow = document.createElement("div");
    divRow.classList.add("row", "g-0");
    let divColImg = document.createElement("div");
    divColImg.classList.add("col-md-4");
    let img = document.createElement("img");
    img.classList.add("rounded-start", "img-fluid");
    img.setAttribute("src", data.data.results[i].thumbnail.path + ".jpg");
    img.setAttribute("style", "width: 6rem");
    let divColText = document.createElement("div");
    divColText.classList.add("col-md-8");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.classList.add("card-title");
    hCardTitle.innerHTML = data.data.results[i].name;
    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    pCardText.innerHTML = data.data.results[i].description;

    divContainer.appendChild(divCard);
    divCard.appendChild(divRow);
    divRow.appendChild(divColImg);
    divRow.appendChild(divColText);
    divColImg.appendChild(img);
    divColText.appendChild(divCardBody);
    divCardBody.appendChild(hCardTitle);
    divCardBody.appendChild(pCardText);
  }
}

const searchBar = document.getElementById("search");
let marvelCharacter = [];
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  console.log(searchString);
});

//  const filter = marvelCharacter.filter((character) => {
// return character.data.results.name.includes(searchString);
