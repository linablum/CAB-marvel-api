let url =
  "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100&offset=100";
let divAlphabet = document.getElementById("alphabet");
let divContainer = document.getElementById("container");

let urls = for (let i = 0; i < 1600; i + 100) {
  const url = "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100&offset=";
  url.push[i];
}
  
  /* function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + ApiKey_PRIVATE + ApiKey_PUBLIC);
  return `ts=${timestamp}&apikey=${ApiKey.PUBLIC}&hash=${md5Hash}`;
} */

  /* async function controller() {
} */

  /* function fetchAll(urls) {
  return Promise.all(
    urls.map((url) =>
      fetch(url)
        .then((res) => res.json())
        .then((data) => ({ data, url }))
        .catch((error) => ({ error, url }))
    )
  );
} */

  async function loadChar() {
    try {
      const res = await fetch(url);
      const marvelCharacter = await res.json();
      //console.log(marvelCharacter);
      alphabetButtons(marvelCharacter);
    } catch (err) {
      console.log(err);
    }
  };

loadChar();

function alphabetButtons(data) {
  const alphabetLowerCase = [..."abcdefghijklmnopqrstuvwxyz"];
  const alphabet = alphabetLowerCase.map((letter) => letter.toUpperCase());
  let divRow = document.createElement("div");
  divRow.classList.add("row");
  let divCol = document.createElement("div");
  divCol.classList.add("col-6");
  for (i = 0; i < alphabet.length; i++) {
    let divBox = document.createElement("div");
    divBox.classList.add("btn-group", "mb-4");
    divBox.setAttribute("role", "group");
    divBox.setAttribute("aria-label", "button group with alphabet");
    let button = document.createElement("button");
    button.classList.add("btn", "btn-outline-light");
    button.setAttribute("type", "button");
    button.setAttribute("id", `${alphabet[i]}`);
    button.innerHTML = alphabet[i];
    divAlphabet.append(divRow);
    divRow.append(divCol);
    divCol.append(divBox);
    divBox.append(button);
    document
      .getElementById(`${alphabet[i]}`)
      .addEventListener("click", function displayChar() {
        let dataFiltered = data.data.results.filter((letter) => {
          return letter.name.charAt(0) == button.innerHTML;
        });
        //console.log(dataFiltered);
        showCard(dataFiltered);
      });
  }
}

function showCard(dataFiltered) {
  divContainer.innerHTML = "";
  for (i = 0; i < 10; i++) {
    let divCard = document.createElement("div");
    divCard.classList.add("card", "bg-transparent", "mb-3", "frosted");
    divCard.setAttribute("style", "max-width:640px");
    let divRow = document.createElement("div");
    divRow.classList.add("row", "g-0");
    let divColImg = document.createElement("div");
    divColImg.classList.add("col-md-4");
    divColImg.setAttribute("style", "width:8rem");
    let img = document.createElement("img");
    img.classList.add("rounded-start", "img-fluid");
    img.setAttribute(
      "src",
      dataFiltered[i].thumbnail.path + "." + dataFiltered[i].thumbnail.extension
    );
    img.setAttribute("style", "width: 7rem");
    let divColText = document.createElement("div");
    divColText.classList.add("col-md-8");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.classList.add("card-title");
    hCardTitle.innerHTML = dataFiltered[i].name;
    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    let pCardSmall = document.createElement("p");
    pCardSmall.classList.add("card-text");
    pCardText.innerHTML = dataFiltered[i].description;
    let small = document.createElement("small");
    small.classList.add("text-muted");
    small.innerHTML = "Number of comics: " + dataFiltered[i].comics.available;

    divContainer.append(divCard);
    divCard.append(divRow);
    divRow.append(divColImg, divColText);
    divColImg.append(img);
    divColText.append(divCardBody);
    divCardBody.append(hCardTitle, pCardText, pCardSmall);
    pCardSmall.append(small);
  }
}

const searchBar = document.getElementById("search");
let marvelCharacter = [];
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  console.log(searchString);
});

// const filter = marvelCharacter.filter((character) => {
// return character.data.results.name.includes(searchString);

//controller();
