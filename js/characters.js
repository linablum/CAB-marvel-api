let url =
  "http://gateway.marvel.com/v1/public/characters?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100";

/* function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + ApiKey.PRIVATE + ApiKey.PUBLIC);
  return `ts=${timestamp}&apikey=${ApiKey.PUBLIC}&hash=${md5Hash}`;
} */

/* fetch(
  "https://gateway.marvel.com:443/v1/public/events?apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957&ts=1&hash=31b62279aa5d465c1ff1206582cea96e&limit=100"
)
  .then((res) => {
    console.log("RESOLVED!", res);
    return res.json();
  })
  .then((data) => {
    console.log(data);
  })
  .catch((e) => {
    console.log("ERROR!", e);
  }); */

async function loadChar() {
  const res = await fetch(url);
  const marvelCharacter = await res.json();
  //showCard(marvelCharacter);
  console.log(marvelCharacter);
}

loadChar();

let divContainer = document.getElementById("container");

function alphabetCheckBox() {
  const alphabet = [..."abcdefghijklmnopqrstuvwxyz"];
  let divRow = document.createElement("div");
  divRow.classList.add("row");
  let divCol = document.createElement("div");
  divCol.classList.add("col-6");
  for (i = 0; i < alphabet.length; i++) {
    let divBox = document.createElement("div");
    divBox.classList.add("btn-group", "mb-4");
    divBox.setAttribute("role", "group");
    divBox.setAttribute("aria-label", "checkbox group with alphabet");
    let input = document.createElement("input");
    input.classList.add("btn-check");
    input.setAttribute("type", "checkbox");
    input.setAttribute("id", "btncheck1");
    input.setAttribute("autocomplete", "off");
    let label = document.createElement("label");
    label.classList.add("btn", "btn-outline-light");
    label.setAttribute("for", "btncheck1");
    label.innerHTML = alphabet[i];
    divContainer.append(divRow);
    divRow.append(divCol);
    divCol.append(divBox);
    divBox.append(input, label);
  }
}

alphabetCheckBox();

function showCard(data) {
  let divContainer = document.getElementById("container");
  for (i = 0; i < 15; i++) {
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
      data.data.results[i].thumbnail.path +
        "." +
        data.data.results[i].thumbnail.extension
    );
    img.setAttribute("style", "width: 7rem");
    let divColText = document.createElement("div");
    divColText.classList.add("col-md-8");
    let divCardBody = document.createElement("div");
    divCardBody.classList.add("card-body");
    let hCardTitle = document.createElement("h5");
    hCardTitle.classList.add("card-title");
    hCardTitle.innerHTML = data.data.results[i].name;
    let pCardText = document.createElement("p");
    pCardText.classList.add("card-text");
    let pCardSmall = document.createElement("p");
    pCardSmall.classList.add("card-text");
    pCardText.innerHTML = data.data.results[i].description;
    let small = document.createElement("small");
    small.classList.add("text-muted");
    small.innerHTML =
      "Number of comics: " + data.data.results[i].comics.available;

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
