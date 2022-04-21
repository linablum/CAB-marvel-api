const searchBar = document.getElementById("search");
let marvelCharacter = [];

async function loadChar() {
  const res = await fetch(
    "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
  );
  const marvelCharacter = await res.json();
  showChar(marvelCharacter);
}

searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  console.log(searchString);
});

function showChar(data) {
  for (let i = 0; i < 30; i++) {
    let list = document.createElement("li");
    list.innerHTML = data.data.results[i].name;
    document.getElementById("test").appendChild(list);
  }
}

loadChar();

//  const filter = marvelCharacter.filter((character) => {
// return character.data.results.name.includes(searchString);
