let url =
  "http://gateway.marvel.com/v1/public/characters?apikey=6689d8f8c4ff142c7814669e36de1ba7&ts=1&hash=ee4c52725ac48dd69be2f06c2fd8aca1&limit=100&offset=";

let urls = [];
for (let i = 0; i < 500; i += 100) {
  urls.push(url + i);
}

let divAlphabet = document.getElementById("alphabet");
let divContainer = document.getElementById("container");

/* function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + API_KEY_PRIVATE + API_KEY_PUBLIC);
  return `ts=${timestamp}&apikey=${ApiKey.PUBLIC}&hash=${md5Hash}`;
} */

/* async function controller() {
} */

/* async function fetchCharacters() {
  try {
    const data = await Promise.all(
      urls.map((url) => fetch(url).then((res) => res.json()))
    );
    console.log(data);
    //let finalData = { ...data };
    //console.log(finalData);
    //let marvelCharacter = Object.values(data);
    //console.log(Object.values(marvelCharacter).flat());
    //console.log(data[6].data.results[2].name);
    alphabetButtons(data);
  } catch (err) {
    console.log(err);
  }
}
 */

async function fetchCharacters() {
  try {
    const allArray = [];
    const data = await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((results) => {
            allArray.push(...results.data.results);
          })
      )
    );
    console.log("allArray", allArray);
    console.log(allArray[1].name);
    alphabetButtons(allArray);
  } catch (err) {
    console.log(err);
  }
}

fetchCharacters();

/* async function loadChar() {
  try {
    const res = await fetch(url);
    const marvelCharacter = await res.json();
    alphabetButtons(marvelCharacter);
  } catch (err) {
    console.log(err);
  }
}

loadChar();
 */

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
        let dataFiltered = data.filter((letter) => {
          return letter.name.charAt(0) == button.innerHTML;
        });
        showCard(dataFiltered);
      });
  }
}

function showCard(dataFiltered) {
  divContainer.innerHTML = "";
  for (i = 0; i < dataFiltered.length; i++) {
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
