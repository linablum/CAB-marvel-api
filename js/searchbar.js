function getHash() {
  const timestamp = new Date().getTime();
  const md5Hash = md5(timestamp + API_KEY_PRIVATE_2 + API_KEY_PUBLIC_2);
  return `apikey=${API_KEY_PUBLIC_2}&ts=${timestamp}&hash=${md5Hash}`;
}

let url =
  "http://gateway.marvel.com/v1/public/characters?limit=100&" + getHash();

const searchBar = document.getElementById("search");
let marvelCharacter = [];
searchBar.addEventListener("keyup", (e) => {
  const searchString = e.target.value;
  console.log(searchString);
  const filteredCharacter = marvelCharacter.filter((character) => {
    return character.name.includes(searchString);
  });
  console.log(filteredCharacter);
  showCard(filteredCharacter);
});

const searchCharacters = async () => {
  try {
    const res = await fetch(url);
    let response = await res.json();
    let marvelCharacter = response.data.results;
    console.log("Map", marvelCharacter);
    return showCard(marvelCharacter);
  } catch (err) {
    console.log(err);
  }
};

searchCharacters();
/* async function fetchCharacters() {
  try {
    const allArray = [];
    await Promise.all(
      urls.map((url) =>
        fetch(url)
          .then((res) => res.json())
          .then((res) => {
            console.log("AllArray", allArray);
            allArray.push(...res.data.results);
            spinner.setAttribute("hidden", "hidden");
          })
      )
    );
    console.log("allArray", allArray);
    alphabetButtons(allArray);
  } catch (err) {
    console.log(err);
  }
} */

let divContainer = document.getElementById("container");

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

//searchBar.addEventListener("change", (e) => {
//const searchString = e.target.value;})
//if (key == "Enter")

//https://gateway.marvel.com:443/v1/public/characters?name=spiderman&limit=1400&offset=100&apikey=b8e5c1e286dbfe1ff75fb79aa0ac5957
