const searchCharacter = () => {
  const searchBar = document.getElementById("search");
  const searchButton = document.getElementById("searchButton");
  let searchString = "";
  searchBar.addEventListener("change", (e) => (searchString = e.target.value));
  searchBar.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
      console.log("Bingo!");
      fetchCharacter(searchString);
      // ! clean the input text
    }
  });
};

searchCharacter();

const fetchCharacter = async (characterName) => {
  let url =
    `http://gateway.marvel.com/v1/public/characters?name=${characterName}&limit=100&` +
    getHash();
  try {
    const res = await fetch(url);
    let response = await res.json();
    // ! if response is empty, show something to the user (for example, no characters with that name)
    let marvelCharacter = response.data.results;
    showCard(marvelCharacter);
  } catch (err) {
    // ! if there is an error show something to the user
    console.log(err);
  }
};

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
