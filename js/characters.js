let divContainer = document.getElementById("container");

for (i = 0; i < 10; i++) {
  let divCard = document.createElement("div");
  divCard.classList.add("card");
  divCard.classList.add("transparent");
  divCard.classList.add("mb-3");
  let divRow = document.createElement("div");
  divRow.classList.add("row g-0");
  let divCol = document.createElement("div");
  divCol.classList.add("col-md-4");
  let img = document.createElement("img");
  img.classList.add("img-fluid rounded-start");
  img.setAttribute("src", data.data.results[i].thumbnail);
  let;
}

const searchBar = document.getElementById("search");
let marvelCharacter = [];

async function loadChar() {
  const res = await fetch(
    "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
  );
  const marvelCharacter = await res.json();
  showChar(marvelCharacter);
}

function showChar(data) {
  for (let i = 0; i < 30; i++) {
    let list = document.createElement("li");
    list.innerHTML = data.data.results[i].name;
    document.getElementById("test").appendChild(list);
  }
}

loadChar();

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  console.log(searchString);
});

//  const filter = marvelCharacter.filter((character) => {
// return character.data.results.name.includes(searchString);
